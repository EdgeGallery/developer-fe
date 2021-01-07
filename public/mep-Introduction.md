## 简介
能力中心是EdgeGallery平台对外提供平台能力和生态能力的API管理中心，开发者在完成应用开发后，如果需要将这个APP的能力开放给其他用户使用，
可以发布成为生态应用，开发者也可以使用能力中心的API进行二次开发

EdgeGallery会将该APP的对外接口提供给其他开发人员使用，并且将该服务通过MECM部署在需要的边缘侧，供其他APP能够使用。

## 平台能力
- 提供平台基础服务。如服务治理、服务注册发现、API Gateway
- 提供电信网络能力，如带宽管理、流量转发、位置服务、UI标识等
- 提供基础的AI能力，如人脸识别等
- 资源消耗相对轻量，如轻量化数据库等
- 能够提供开发者友好的接口API或者SDK

## 流程介绍
- 应用上车EdgeGallery平台，此流程可参考Developer应用上车流程
- 应用上车完成后，可以选择是否发布
    - 选择成为生态应用后，Developer将会在APP认证的过程添加生态应用相关的认证测试用例
    - 成为生态应用后，后续应用上车EdgeGallery平台时，Developer平台再能力选择的页面将会展示相关能力
    - 三方应用选择使用生态应用能力依赖后，在三方应用部署的过程中，生态应用会作为依赖条件部署

## 应用需求

-  需要生态应用提供相关开发者的API与SDK
-  需要生态应用提供相关文档说明
-  需要生态应用提供相关API模拟器（Option）

## 如何发布和使用edgegallery提供的API能力

EdgeGallery作为5G MEC开源平台，将始终开放5G能力和生态能力。用户在进行应用开发时，可以参考本文调用EdgeGallery生态能力。 这里我们将提供生态能力的应用称为 provider app，将调用生态能力的应用称为 consumer app，具体流程请参考如下步骤：

- 应用发布能力到mep

在提供生态能力前，provider app 需要先将自身服务注册到MEP（实现服务注册接口），provider app 可以通过MEP-Agent自动注册，也可以自身实现服务注册接口。 通过EdgeGallery开发者平台进行部署测试的app无需关注 provider app 的服务注册，平台会自动为用户实现 provider app 的部署与服务注册。
具体发布服务详情，请参考developery应用上车流程。


- 如何使用能力

在提供生态能力前，provider app 需要先将自身服务注册到MEP（实现服务注册接口），provider app 可以通过MEP-Agent自动注册，也可以自身实现服务注册接口。 通过EdgeGallery开发者平台进行部署测试的app无需关注 provider app 的服务注册，平台会自动为用户实现 provider app 的部署与服务注册。
开发者使用edgegallery提供的能力进行二次开发时，可以通过以下步骤调用平台能力：

- 1.通过mep-agent获取token

consumer app 在编写部署文件时需要注入MEP-Agent的信息，从而可以在pod内部调用MEP-Agent的接口获取token。consumer app 调用MEP接口时header中必须添加token信息，否则会提示无权访问。
在部署时注入MEP-Agent信息后，consumer app 可以直接访问如下接口获取token，其中token_type是token类型，access_token是token的值。在携带token时需要以 "token_type" + "空格" + "access_token" 的形式组合使用。获取token的url如下：
```yaml
url: http://localhost:8080/mep-agent/v1/token
method: GET
response: {"access_token":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDg3OTM1NjAuMzM4NzM1LCJpc3MiOiJtZXBhdXRoIiwic3ViIjoiNDdlOTg4MGItYzMyNy00NmI0LTg3MWYtMzY5NDU3NDJjZDIyIiwiY2xpZW50aXAiOiIyMDAuMS4xLjIifQ.mIlkBxTL_HRPiwreGXS_Cd1yAJd194nDo7MgOF4aDjuo2qVGQ5-U4Gk10vfVqEBmfSZzN6cCVwQimCuyUs4n0hn_HdqpUIZVtBf_ISuXe8EN4RGBrqU2woEYYAcXqg4Fawet8t7ZSZlldcHrfWPL2zcB2kAGloR2QFMS7vRY5nSlXXmt5-LEi7_uaJPtYcwknT2iHzrdxZp-GJmEW-SqebxQWObD58SQMgOqC-SITIe-bizMnKU8rJMCXsvs8-3IK2Mwe76mmaAEo1iL2JpYuqnUzA9CTmo0dJZ8ZaZTAKrUx6P7mlOu7IMP8dpOiYbpOOxFqa4UgH4w4DZHiDqTdA","token_type":"Bearer","expires_in":3600}
```
响应包含token的值、token类型和有效期

- 2.consumer app 获取 provider app 的endpoint信息，开发者调用服务发现接口查看服务的url

consumer app 通过MEP的服务发现接口获取 provider app 的endpoint信息，为下一步调用 provider app 的生态能力做准备。在调用服务发现接口时，需要将获取的token组织好，填充请求头的"Authorization"字段。 返回值中关注 transportInfo->endpoint->uris[0] 的值，它将作为 provider app 的endpoint信息进行使用。consumer App通过服务发现接口获取provider App的endpoint信息如下：
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
响应中关注transportInfo->endpoint->uris[0]的值即为provider App 的接口信息。

- 3.consumer App调用provider App的接口

consumer app 拼接获取到的 provider app 的endpoint信息和 provider app 的业务url，通过此url可以调用 provider app 提供的生态能力，调用providerApp，header中添加获取到的token的值，body添加调用provider App需要的参数，url如下：

```yaml
url: "https://mep-api-gw.mep:8443/FaceRegService8d025f7b745b211eba564/providerAppurl"
method: 
header: {"Authorization": "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDg3OTQzMjIuNTQxMzYwOSwiaXNzIjoibWVwYXV0aCIsInN1YiI6IjVhYmU0NzgyLTJjNzAtNGU0Ny05YTRlLTBlZTNhMWEwZmQxZiIsImNsaWVudGlwIjoiMTU5LjEzOC4xMzAuMTU2In0.RL8VOODpzpGipxbqL1MOOmb0wIcVV1Gsh9zMhp8gxCf2N725sbBtmq_P5UCAF8_F7ub6Ehgw0u906NrOQymhdYxuM9GaAAj2ReVxSGYAMsY-rZl8XEkR_SLL2CZHK2vmaT0G7CgsWyrMOkUd8k5SyJ4jCqzrSiPcoC3ECNwIDJwcNmu8ET2OWnRyi53Ef4dbxL9iWtRUEjh9xuNMl4vxF3y3xvo_Li6SCfY0AHN6vdJCcejHXXPbSqcP9gPfVr0jkNwfbA3-ZoirM80JEjIiguDfqlD23tSLwa2GOZ09xrG34Ak8fp_mnDLG6f8jBzi7kt-14vZr4uHRqYhhT9FvFA"}
body:
respponse: 
```
在以上流程的基础上 consumer App 能够通过EdgeGallery MEP模块调用 provider App 提供的所有生态能力。

