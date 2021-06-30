### How to write a correct deployment yaml

1.When developers deploy and debug container applications, they can download the sample yaml provided by the developer platform, modify the sample yaml according to the application they need to deploy, and upload it for use.

2.The developer platform will verify the image information in the uploaded yaml. The image configured in the yaml is not limited to a fixed format, but it should be noted that the image needs to be an open source image or an existing image in the EdgeGallery warehouse.

3.If the image format configured in yaml is the EdgeGallery warehouse image format, please upload the image to the EdgeGallery warehouse in advance to prevent the deployment and commissioning of the container application from failing.

4.If the image format configured in yaml is EdgeGallery warehouse image format, the recommended image configuration format is as follows:
- '{{.Values.imagelocation.domainname}}/{{.Values.imagelocation.project}}/xxx:xxx'

5.If the image configured in yaml belongs to other open source image warehouses, please ensure that the image configuration form is correct.

6.Please configure the namespace in yaml as much as possible, and ensure that its format is'{{ .Values.appconfig.appnamespace }}'.

7.Configure the correct one-time as much as possible, and ensure that the key parameters in yaml are configured correctly, such as exposed ports, configured environment variables, and so on.


### How to develop an example application

1.Consumer application can easily integrate with MEP/MEP-AGENT to obtain producer application services

2.Every consumer application should be writing 2 to 3 lines of code to acheive this functionality

3.Mep-agent should expose an API’s to get token and service endpoint

4.Consumer application uses consumer client to perform CRUD operations.

5.Example consumer application can leverage mep-agent and consumerclient to communicate with mep-service via kong

6. ClientFactory code is implemented to send request to mep-agent to get service endpoint and based on endpoint information will create a client object
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

7.Consumerclient code is implemented to get access token and send request to mep service via kong
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

8.Application code is implemented to send request to consumer client for communicating with mep service via kong api gateway
```
rest_client = clientFactory.get_client_by_service_name(constants.face_recognition_service)
url = rest_client.get_endpoint() + "/v1/face-recognition/recognition"
response = rest_client.post(url, body)
```
