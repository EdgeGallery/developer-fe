## Overview

- **Technology vision**

    Focusing on the 5G edge computing scenario, the basic framework of resources, applications, security, and management of the MEC edge and the de facto standard for network open services are built through open source collaboration, and interconnection with public clouds is realized. On the basis of the heterogeneous differentiation of compatible edge infrastructure, a unified MEC application ecosystem is built.

- **Industry vision**

    Focus on the promotion of 5G application ecology, organize and operate in accordance with the principles of voluntariness, fairness, transparency, and openness, and gather industrial forces including operators, manufacturers, application developers, R&D institutions, and industrial organizations to build mutual benefit and win-win results The business ecosystem of edge computing.
    
## One-stop application integration development platform

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Developer platform (Developer) is a platform that provides development tools/test environment/online deployment for App developers.**

- #### Features Introduction

 - **Plug-in management**
    
    - Provide developers with practical plug-ins to help them develop quickly, and the plug-ins will be continuously updated.
    
    - Developers can participate in the plug-in development process and contribute their plug-ins to the platform.

 - **API management** 

    - The platform provides usable MEP interfaces for developers to use, which improves the development efficiency of developers and can develop more practical App applications.
    
    - The MEP interface will be continuously updated to enrich capabilities. Provide a tool chain to quickly migrate App from the x86 platform to the RAM platform.
    
    - Developers can also contribute their own apps in the form of interfaces for other developers to call.

 - **Projet management** 

    - For developers, it provides management from App project establishment/development/testing/deployment/online release.
    
    - Provide conversion tools to quickly convert x86 platform App to RAM platform to run.
    
    - Provides a test sandbox, which can automatically deploy the App to a public cloud environment for users to test.
    
    - Directly connect to the application warehouse, and the App that has passed the development test can be directly published to the application warehouse.

## Application warehouse

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**App Store (AppStore) is an edge application market where developers release and launch App applications. Edge applications developed by the Developer platform have been tested by ATP (Application Test Platform)**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Later, it can be directly published to the AppStore application store; users can also directly upload their own edge applications in the AppStore, and they can also be released and displayed after passing the ATP test.**

- #### Features Introduction

 - **Application warehouse**
    
    - Developers can upload their own applications to the application repository.
    
    - Developers can comment on applications in the application market and query application details.
    
    - Developers can query the applications they need on demand and download them.

 - **My Applications** 

    - Different developers can log in to the Appstore to view their uploaded applications, view the details, and download them.
    
    - The applications in my application also include applications shared by the same developer in the application warehouse after successful deployment and commissioning on the developer platform.

 - **Application sharing** 

    - Ordinary users cannot see this module, and application sharing is open to application warehouse administrators.
    
    - You can add external warehouses, pull applications, and enrich EdgeGallery's application warehouses.
    
    - You can push the applications in the EdgeGallery application warehouse and push them to the application warehouses of other vendors.
    
    - Messages and logs can be recorded during the push and pull process for operational analysis.

## MECM Management Orchestrator

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**The MEC management system is a platform for analyzing, distributing, arranging, and deploying APP packages.**

- #### Features Introduction

 - **Application management**
    
    - Provide synchronization applications from the application market, you can view the application package details.
    
    - Distribute application packages from the central node to the edge nodes for deployment.
    
    - Provides to view the deployed application instance, you can view the details of the instance, delete, etc.

 - **Edge node** 

    - Provide edge node registration, editing, system resource monitoring and other functions.
    
    - Before edge node registration, the APP LCM system, APP Rule MGR system, and edge warehouse system must be registered to ensure that the application can be deployed to the edge node.

 - **System** 

    - Each system in this module is a prerequisite for registering edge nodes.
    
    - Provide APP LCM system registration, editing, and deletion. The APP lCM system (application life cycle management) can be deployed centrally or sink to edge nodes for local application life cycle management.
    
     - **APP LCM is a part of MEPM and is responsible for handling host-level lifecycle management, including instantiation, termination, etc. It provides a pluggable architecture to support multiple infrastructures.**
    
    - Provide registration, editing, and deletion of APP Rule MGR system.
    
     - **APP Rule MGR is a part of MEPM, which is responsible for receiving the traffic rules issued by the MEP orchestrator (APPO), and then forwarding the traffic rules to the MEP for configuration.**
    
    - Provide registration, editing, and deletion of the application market system.
    
     - **The application market is the source of all applications, and the enrichment and development of the EdgeGallery application warehouse mainly comes from the contributions of community developers and major manufacturers and partners.**
