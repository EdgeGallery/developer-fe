# Development tools
Introduction
## Multilingual SDK
he swagger API provided by the service will automatically generate client code for developers to call and debug locally. Taking MEP as an example, we will introduce how to implement MEP service discovery, route forwarding and other functions through SDK.

## python mep sdk
#### Install mep SDK third-party library
The mep sdk has been uploaded in the PyPI package manager and installed by the following command:

```

// install mep sdk

pip install edgegallery_sdk_mep

```

#### Import edgegallery_sdk_mep and configure mep
```
import edgegallery_sdk_mep
# Configure the ip and port of mep
configuration = edgegallery_sdk_mep.Configuration()
configuration.host = "https://mep-api-gw.mep:8443"
# Ignore the certificate
configuration.verify_ssl = False

```
####  Call the get token interface
```
edgegallery_sdk_mep.api_client.ApiClient(configuration=configuration)
get_token = edgegallery_sdk_mep.TokenApi(edgegallery_sdk_mep.api_client.ApiClient(configuration=configuration))
# Configure the parameters of get token
content_type = "application/json"
authorization = "SDK-HMAC-SHA256 Access=QVUJMSUMgS0VZLS0tLS0, SignedHeaders=content-type;host;x-sdk-date, Signature=b9663443829bcf4c3954f5cfd39076ed9a29d045b65d9aee629fcc5911668384"
x_sdk_date = "20201102T120417Z"
host = "114.115.217.154:30443"
get_token_response = get_token.mepauth_mepauth_v1_token_post(content_type, authorization, x_sdk_date, host=host)
# Get token
access_token = get_token_response.access_token

```
#### Configure the query service name ser_name, call the service discovery interface
```
header_value = "Bearer " + access_token
find_service = edgegallery_sdk_mep.ServicesApi(edgegallery_sdk_mep.api_client.ApiClient(configuration=configuration, header_name="Authorization", header_value=header_value))
# Configure the query service name
ser_name = "face-recognition"
get_find_service = find_service.services_get(ser_name=ser_name)
# Get the url of the dependent service
url_find_service = get_find_service[0].transport_info.endpoint['uris'][0]

```

#### Call the interface-1 of the provider app
```
header_value = "Bearer " + access_token
headers = {'Authorization': header_value}
# url_find_service and service url splicing
deploy_url = url_find_service + 'v1/face-recognition/'
response_face_recognition = requests.get(local_url, headers=headers, verify=False)

```

## Plug-in

This IDEA plug-in is developed on the basis of the jdk1.8 version. It can help APP developers to develop and deploy, mainly in the following two aspects:

- Sample code can be generated for all APIs provided in APPStore through plug-ins, which is convenient for developers to carry out secondary development

- The plug-in can automatically generate TOSCA language deployment file framework according to user input, and provide one-click generation of csar package function, which is convenient for developers to deploy 

### Development environment preparation

Before using this plug-in, you need to prepare a development environment, which mainly includes the following aspects:

- Download[IntelliJ IDEA](https://www.jetbrains.com/idea/),you can choose the paid Ultimate Edition or the free Community Edition (Community) according to your needs

- Download jdk, recommended to use jdk1.8 and above, set jdk environment variables and configure IDEA, novices can view[tutorial](https://blog.csdn.net/nobb111/article/details/77116259)


### Plug-in installation instructions

The plug-in supports two installation methods:

- Search "MecAppDev" in the Plugin market of IDEA, download and install directly (provided later)

- Click "Download" on the interface, download the compressed package to the local, select Plugin-> Install Plugin from Disk in IDEA, select the downloaded compressed package and install it

After the plug-in is installed, restart IDEA to use it. The plug-in installation directory is Tools-> MecAppDev


### Instructions for use

The plug-in mainly contains 3 main functional modules, namely: MainMenu, AppPackage, one-click packaging and obtaining APP samples

#### MainMenu

The main interface consists of three parts: AppAffinity, AppDepend, AppInformation:

- AppAffinity:Check the App affinity property, it will be written into the App deployment file to help the App be deployed to the appropriate node

- AppDepend:You can view and directly rely on the existing api/SDK in the Toolbox, and generate the appSample folder, generate sample code based on the java language for the dependent api/SDK, and the developer can directly compile and run the sample code to help developers in Perform secondary development on existing functions to avoid duplication of work

- AppInformation: Contains the name, producer, and version number of the App, which will be written into the App deployment file

Click "OK" to generate appSample sample code folder and deployment folder named App name + "_app", if not, please refresh the project directory

The appSample folder contains all API call samples that the developer depends on

The deployment folder only contains the deployment framework, developers need to write their own deployment files, specify the mirror source and dependencies, etc.

#### Download sample app

This function can download a sample app that has been developed, including App image and deployment files, to help developers better understand App deployment

#### AppPackage one-click packaging

After the developer has finished writing the deployment file, he can use this function to select the deployment folder, and package it into a csar format file with one click for the next deployment operation

### Resource term
|中文|英文|说明|
|:-|:-|:-|
|亲和属性|Affinity|The ability of the App to rely more on during its operation.|
|镜像|Image|Docker image generally contains operating system and application software.|
|部署|Deployment|After the App is developed, it needs to be deployed to the environment for consumers to use.|