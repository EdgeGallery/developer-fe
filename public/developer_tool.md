# 开发工具
介绍
## 多语言SDK
将服务提供的swagger API 自动生成客户端代码，方便开发者本地调用和调试，以MEP为例，介绍如何通过SDK实现MEP服务发现、路由转发等功能。

## python mep sdk
#### 安装mep SDK第三方库
mep sdk已经上传在PyPI包管理器中，通过以下命令安装:

```

// 安装mep sdk

pip install edgegallery_sdk_mep

```

#### 导入edgegallery_sdk_mep，并配置mep
```
import edgegallery_sdk_mep
# 配置mep 的ip和端口
configuration = edgegallery_sdk_mep.Configuration()
configuration.host = "https://mep-api-gw.mep:8443"
# 忽略证书
configuration.verify_ssl = False

```
####  调用获取 token 接口
```
edgegallery_sdk_mep.api_client.ApiClient(configuration=configuration)
get_token = edgegallery_sdk_mep.TokenApi(edgegallery_sdk_mep.api_client.ApiClient(configuration=configuration))
# 配置get token 的参数
content_type = "application/json"
authorization = "SDK-HMAC-SHA256 Access=QVUJMSUMgS0VZLS0tLS0, SignedHeaders=content-type;host;x-sdk-date, Signature=b9663443829bcf4c3954f5cfd39076ed9a29d045b65d9aee629fcc5911668384"
x_sdk_date = "20201102T120417Z"
host = "114.115.217.154:30443"
get_token_response = get_token.mepauth_mepauth_v1_token_post(content_type, authorization, x_sdk_date, host=host)
# 获取token
access_token = get_token_response.access_token

```
#### 配置查询的服务名ser_name，调用服务发现接口
```
header_value = "Bearer " + access_token
find_service = edgegallery_sdk_mep.ServicesApi(edgegallery_sdk_mep.api_client.ApiClient(configuration=configuration, header_name="Authorization", header_value=header_value))
# 配置查询的服务名
ser_name = "face-recognition"
get_find_service = find_service.services_get(ser_name=ser_name)
# 获取依赖服务的url
url_find_service = get_find_service[0].transport_info.endpoint['uris'][0]

```

#### 调用provider app的接口-1
```
header_value = "Bearer " + access_token
headers = {'Authorization': header_value}
# url_find_service 与服务url拼接
deploy_url = url_find_service + 'v1/face-recognition/'
response_face_recognition = requests.get(local_url, headers=headers, verify=False)

```

## 插件

此IDEA插件是在jdk1.8版本的基础上进行开发，它能够帮助APP开发者进行开发和部署，主要体现在以下两个方面：

- 通过插件可以对APPStore中提供的所有api生成样例代码，便于开发者进行二次开发

- 插件可以根据用户输入自动生成TOSCA语言的部署文件框架，并提供一键生成csar包功能，便于开发者进行部署 

### 开发环境准备

使用此插件前需要准备开发环境，主要包含以下几个方面：

- 下载[IntelliJ IDEA](https://www.jetbrains.com/idea/)，可以根据自身需求选择付费的旗舰版（Ultimate）或者免费的社区版（Community）

- 下载jdk，推荐使用jdk1.8及以上版本，设置jdk的环境变量并配置IDEA，新手可以查看[教程](https://blog.csdn.net/nobb111/article/details/77116259)


### 插件安装说明

插件支持两种安装方式：

- 在IDEA的Plugin市场搜索“MecAppDev”，直接下载安装（后续提供）

- 在界面点击“Download”，下载压缩包到本地，在IDEA中选择Plugin-> Install Plugin from Disk，选择下载的压缩包后进行安装

插件安装好后重启IDEA即可使用，插件的安装目录为Tools-> MecAppDev


### 使用说明

插件主要包含3个主要的功能模块，分别是：MainMenu、AppPackage一键打包和获取APP样例

#### MainMenu

主界面包含三个部分：AppAffinity、AppDepend、AppInformation：

- AppAffinity：勾选App亲和的属性，会写入App部署文件中，帮助App部署到合适的节点

- AppDepend：可查看并直接依赖Toolbox中已有的api/SDK，并生成appSample文件夹，对依赖的api/SDK生成基于java语言的示例代码，并且开发者可以直接编译运行示例代码，帮助开发者在已有功能上进行二次开发，避免重复工作

- AppInformation：包含App的名字、生产者、版本号，会写入App部署文件

点击“OK”后生成appSample样例代码文件夹和以App名字+“_app”为名的部署文件夹，如果没有请刷新工程目录

appSample文件夹中包含开发者依赖的所有api的调用样例

部署文件夹中仅包含部署框架，开发者需要自己编写部署文件，指定镜像源和依赖等

#### 下载APP样例

此功能可以下载一个已经开发好的样例APP，包含App的镜像和部署文件，帮助开发者更好的理解App部署

#### AppPackage一键打包

开发者在完成部署文件编写后，可以使用此功能选择部署文件夹，一键打包成csar格式的文件进行下一步的部署操作

### 资源术语
|中文|英文|说明|
|:-|:-|:-|
|亲和属性|Affinity|App在运行过程中更加依赖的能力。|
|镜像|Image|Docker镜像，一般包含了操作系统和应用软件。|
|部署|Deployment|App开发完成后需要部署到环境上，供消费者使用。|
## 工具链