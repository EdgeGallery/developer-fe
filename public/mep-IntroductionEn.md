## Introduction
The competence center is the API management center for the EdgeGallery platform to provide platform capabilities and ecological capabilities to the outside world. After developers have completed application development, if they need to open the capabilities of this APP to other users,
It can be published as an ecological application, and developers can also use the API of the competence center for secondary development

EdgeGallery will provide the external interface of the APP for other developers to use, and deploy the service on the required edge side through MECM, so that other APPs can use it.

## Platform capabilities
- Provide platform basic services. Such as service governance, service registration discovery, API Gateway
- Provide telecom network capabilities, such as bandwidth management, traffic forwarding, location services, UI identification, etc.
- Provide basic AI capabilities, such as face recognition, etc.
- Relatively lightweight resource consumption, such as lightweight databases, etc.
- Able to provide developer-friendly interface API or SDK

## Process introduction
- Application on the EdgeGallery platform, this process can refer to the Developer application on the process
- After the app is loaded, you can choose whether to publish
    - After choosing to become an ecological application, the Developer will add certification test cases related to the ecological application in the APP certification process
    - After becoming an ecological application, when subsequent applications are on the EdgeGallery platform, the developer platform's ability selection page will show the relevant capabilities
    - After the third-party application chooses to use the ecological application capability dependency, the ecological application will be deployed as a dependent condition during the deployment of the third-party application

## Application requirements

-  Ecological applications need to provide APIs and SDKs for relevant developers
-  Need to provide relevant documentation for ecological applications
-  Need to provide relevant API simulators for ecological applications (Option)

## How to publish and use the API capabilities provided by edgegallery

As a 5G MEC open source platform, EdgeGallery will always open up 5G capabilities and ecological capabilities. Users can refer to this article to call EdgeGallery ecological capabilities when developing applications. Here we call the application that provides ecological capabilities as provider app, and the application that invokes ecological capabilities as consumer app. For the specific process, please refer to the following steps:

- Application publishing capability to mep

Before providing ecological capabilities, the provider app needs to register its own service to the MEP (implementing the service registration interface). The provider app can automatically register through the MEP-Agent, or it can implement the service registration interface itself. Apps deployed and tested through the EdgeGallery developer platform do not need to pay attention to the service registration of the provider app. The platform will automatically implement the deployment and service registration of the provider app for users.
For specific release service details, please refer to the development process of the developer app.


- How to use abilities

Before providing ecological capabilities, the provider app needs to register its own service to the MEP (implementing the service registration interface). The provider app can automatically register through the MEP-Agent, or it can implement the service registration interface itself. Apps deployed and tested through the EdgeGallery developer platform do not need to pay attention to the service registration of the provider app. The platform will automatically implement the deployment and service registration of the provider app for users.
When developers use the capabilities provided by edgegallery for secondary development, they can call the platform capabilities through the following steps:

- 1.Obtain token through mep-agent

The consumer app needs to inject the information of the MEP-Agent when writing the deployment file, so that it can call the interface of the MEP-Agent inside the pod to obtain the token. When the consumer app calls the MEP interface, the token information must be added to the header, otherwise it will be prompted to have no access.
After injecting the MEP-Agent information during deployment, the consumer app can directly access the following interface to obtain the token, where token_type is the token type and access_token is the value of the token. When carrying the token, it needs to be used in combination in the form of "token_type" + "space" + "access_token". The URL to obtain the token is as follows:
```yaml
url: http://localhost:8080/mep-agent/v1/token
method: GET
response: {"access_token":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDg3OTM1NjAuMzM4NzM1LCJpc3MiOiJtZXBhdXRoIiwic3ViIjoiNDdlOTg4MGItYzMyNy00NmI0LTg3MWYtMzY5NDU3NDJjZDIyIiwiY2xpZW50aXAiOiIyMDAuMS4xLjIifQ.mIlkBxTL_HRPiwreGXS_Cd1yAJd194nDo7MgOF4aDjuo2qVGQ5-U4Gk10vfVqEBmfSZzN6cCVwQimCuyUs4n0hn_HdqpUIZVtBf_ISuXe8EN4RGBrqU2woEYYAcXqg4Fawet8t7ZSZlldcHrfWPL2zcB2kAGloR2QFMS7vRY5nSlXXmt5-LEi7_uaJPtYcwknT2iHzrdxZp-GJmEW-SqebxQWObD58SQMgOqC-SITIe-bizMnKU8rJMCXsvs8-3IK2Mwe76mmaAEo1iL2JpYuqnUzA9CTmo0dJZ8ZaZTAKrUx6P7mlOu7IMP8dpOiYbpOOxFqa4UgH4w4DZHiDqTdA","token_type":"Bearer","expires_in":3600}
```
The response contains the value of the token, the token type, and the validity period

- 2.The consumer app obtains the endpoint information of the provider app, and the developer calls the service discovery interface to view the url of the service

The consumer app obtains the endpoint information of the provider app through the service discovery interface of the MEP to prepare for the next step to invoke the ecological capabilities of the provider app. When calling the service discovery interface, you need to organize the acquired tokens and fill in the "Authorization" field of the request header. Pay attention to the value of transportInfo->endpoint->uris[0] in the return value, which will be used as the endpoint information of the provider app. Consumer App obtains the endpoint information of the provider App through the service discovery interface as follows:
```yaml
url: https://mep-api-gw.mep:8443/mepserver/mec_service_mgmt/v1/services?ser_name=
method: GET
header: {"Authorization": "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDg3OTQzMjIuNTQxMzYwOSwiaXNzIjoibWVwYXV0aCIsInN1YiI6IjVhYmU0NzgyLTJjNzAtNGU0Ny05YTRlLTBlZTNhMWEwZmQxZiIsImNsaWVudGlwIjoiMTU5LjEzOC4xMzAuMTU2In0.RL8VOODpzpGipxbqL1MOOmb0wIcVV1Gsh9zMhp8gxCf2N725sbBtmq_P5UCAF8_F7ub6Ehgw0u906NrOQymhdYxuM9GaAAj2ReVxSGYAMsY-rZl8XEkR_SLL2CZHK2vmaT0G7CgsWyrMOkUd8k5SyJ4jCqzrSiPcoC3ECNwIDJwcNmu8ET2OWnRyi53Ef4dbxL9iWtRUEjh9xuNMl4vxF3y3xvo_Li6SCfY0AHN6vdJCcejHXXPbSqcP9gPfVr0jkNwfbA3-ZoirM80JEjIiguDfqlD23tSLwa2GOZ09xrG34Ak8fp_mnDLG6f8jBzi7kt-14vZr4uHRqYhhT9FvFA"}
response: [
    {
        "serInstanceId": "54535ad49a6d62060ca0261d075817ae",
        "serName": "FaceRegService8",
        "serCategory": {
            "href": "/example/catalogue1",
            "id": "id12345",
            "name": "RNI",
            "version": "1.2.3"
        },
        "version": "4.5.8",
        "state": "ACTIVE",
        "transportId": "Rest1",
        "transportInfo": {
            "id": "TransId12345",
            "name": "REST",
            "description": "REST API",
            "type": "REST_HTTP",
            "protocol": "HTTP",
            "version": "2.0",
            "endpoint": {
                "uris": [
                    "https://mep-api-gw.mep:8443/FaceRegService8d025f7b745b211eba564"
                ],
                "addresses": null,
                "alternative": null
            },
            "security": {
                "oAuth2Info": {
                    "grantTypes": [
                        "OAUTH2_CLIENT_CREDENTIALS"
                    ],
                    "tokenEndpoint": "/mecSerMgmtApi/security/TokenEndPoint"
                }
            }
        },
        "serializer": "JSON",
        "scopeOfLocality": "MEC_SYSTEM",
        "isLocal": true,
        "livenessInterval": 0,
        "_links": {
            "self": {}
        }
    }
]
```
The value of transportInfo->endpoint->uris[0] in the response is the interface information of the provider App.

- 3.Consumer App calls the interface of provider App

The endpoint information of the provider app and the business url of the provider app obtained by splicing the consumer app. Through this url, the ecological capabilities provided by the provider app can be called, the providerApp is called, the value of the obtained token is added to the header, and the body is added to call the provider App. The parameters, url are as follows:

```yaml
url: "https://mep-api-gw.mep:8443/FaceRegService8d025f7b745b211eba564/providerAppurl"
method: 
header: {"Authorization": "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDg3OTQzMjIuNTQxMzYwOSwiaXNzIjoibWVwYXV0aCIsInN1YiI6IjVhYmU0NzgyLTJjNzAtNGU0Ny05YTRlLTBlZTNhMWEwZmQxZiIsImNsaWVudGlwIjoiMTU5LjEzOC4xMzAuMTU2In0.RL8VOODpzpGipxbqL1MOOmb0wIcVV1Gsh9zMhp8gxCf2N725sbBtmq_P5UCAF8_F7ub6Ehgw0u906NrOQymhdYxuM9GaAAj2ReVxSGYAMsY-rZl8XEkR_SLL2CZHK2vmaT0G7CgsWyrMOkUd8k5SyJ4jCqzrSiPcoC3ECNwIDJwcNmu8ET2OWnRyi53Ef4dbxL9iWtRUEjh9xuNMl4vxF3y3xvo_Li6SCfY0AHN6vdJCcejHXXPbSqcP9gPfVr0jkNwfbA3-ZoirM80JEjIiguDfqlD23tSLwa2GOZ09xrG34Ak8fp_mnDLG6f8jBzi7kt-14vZr4uHRqYhhT9FvFA"}
body:
respponse: 
```
On the basis of the above process, the consumer App can call all the ecological capabilities provided by the provider App through the EdgeGallery MEP module.

