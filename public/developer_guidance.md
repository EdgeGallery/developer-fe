### 如何编写一个正确的部署yaml

1.开发者对容器应用部署调测时，可以下载开发者平台提供的样例yaml，根据自己需要部署的应用，修改样例yaml并上传使用。

2.开发者平台会对上传的yaml中的镜像信息进行校验，yaml中配置的镜像不拘泥于固定格式，但是需要注意的是镜像需要为开源镜像或者EdgeGallery仓库已有镜像。

3.如果yaml中配置的镜像形式为EdgeGallery仓库镜像形式，请提前上传镜像到EdgeGallery仓库，防止容器应用部署调测失败。 

4.如果yaml中配置的镜像形式为EdgeGallery仓库镜像形式，建议的镜像配置格式如下：
- '{{.Values.imagelocation.domainname}}/{{.Values.imagelocation.project}}/xxx:xxx'

5.如果yaml中配置的镜像属于其他开源镜像仓库，请确保镜像配置形式正确。

6.请尽可能的配置yaml中的namespace，并确保其格式为'{{ .Values.appconfig.appnamespace }}'。

7.尽可能一次性配置正确，确保yaml中的关键参数配置正确，例如暴露的端口，配置的环境变量等等。

### 如何开发示例应用程序

1.消费者应用可以方便地与MEP/MEP-AGENT集成，获得生产者应用服务

2.每个消费者应用程序都应该编写 2 到 3 行代码来实现此功能

3.Mep-agent 应该公开一个 API 来获取令牌和服务端点

4.消费者应用程序使用消费者客户端来执行 CRUD 操作。

5.示例消费者应用程序可以利用 mep-agent 和 consumerclient 通过 kong 与 mep-service 通信

6.ClientFactory 代码实现向 mep-agent 发送请求以获取服务端点，并根据端点信息创建一个客户端对象
```
def get_service_endpoint(service):
    url = restclient.mep_agent_url + "/mep-agent/v1/endpoint/{0}".format(service)
    headers = {'Content-Type': "application/json"}
    if restclient.ssl_enabled:
        url = restclient.httpsUrl + url
        response = requests.get(url, headers=headers, verify=restclient.ssl_cacertpath)
    else:
        url = restclient.httpUrl + url
        response = requests.get(url, headers=headers)
    # extracting data in json format
    if response:
        data = response.json()
        url = data["uris"]
        return url[0]
    else:
        return ""
class ClientFactory:
    #  constructor
    def __init__(self, list_of_services):
        self.update_client_object(list_of_services)
    def update_client_object(self, list_of_services):
        for service in list_of_services:
            endpoint = get_service_endpoint(service)
            if endpoint != "" and "http" in endpoint or "https" in endpoint:
                    clientObjects[service] = restclient.RestClient(endpoint)
    def get_client_by_service_name(self, service):
        return clientObjects[service]
```

7.实现了消费者客户端代码以获取访问令牌并通过 kong 向 mep 服务发送请求
```
def get_access_token():
    url = mep_agent_url + "/mep-agent/v1/token"
    headers = {'Content-Type': contentType}
    if ssl_enabled:
        url = httpsUrl + url
        response = requests.get(url, headers=headers, verify=ssl_cacertpath)
    else:
        url = httpUrl + url
        response = requests.get(url, headers=headers)
    # extracting data in json format
    data = response.json()
    access_token = data["access_token"]
    return access_token
class RestClient:
    # rest client constructor
    def __init__(self, endpoint):
        self.endpoint = endpoint
    def post(self, url, body=None, upload_files=None):
        access_token = get_access_token()
        access_token = "Bearer " + access_token
        headers = {'Authorization': access_token}
        response = requests.post(url, data=body, files=upload_files, headers=headers, verify=False)
        return response
    def delete(self, url):
        access_token = get_access_token()
        access_token = "Bearer " + access_token
        headers = {'Authorization': access_token}
        response = requests.delete(url, headers=headers, verify=False)
        return response
    def get_endpoint(self):
        return self.endpoint
```

8.应用代码实现通过kong api网关向消费者客户端发送与mep服务通信的请求
```
rest_client = clientFactory.get_client_by_service_name(constants.face_recognition_service)
url = rest_client.get_endpoint() + "/v1/face-recognition/recognition"
response = rest_client.post(url, body)
```
