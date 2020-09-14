# Introduction

This IDEA plugin is developed based on the jdk1.8 version. It can help APP developers to develop and deploy. It is mainly reflected in the following two aspects:

-The plugin can generate sample code for all APIs provided in the APPStore, which is convenient for developers to conduct secondary development

-The plugin can automatically generate a TOSCA deployment file framework based on user input, and provides a one-click csar package generation function for developers to deploy

# Development environment preparation

Before using this plugin, you need to prepare a development environment, which mainly includes the following aspects:

-Download [IntelliJ IDEA](https://www.jetbrains.com/idea/), you can choose paid Ultimate or Community based on your needs

-Download jdk, it is recommended to use jdk1.8 and above, set jdk environment variables and configure IDEA, novices can view [tutorial] (https://blog.csdn.net/nobb111/article/details/77116259)


## Plugin installation instructions

The plugin supports two installation methods:

-Search for "MecAppDev" in IDEA's Plugin market, download and install directly (provided later)

-Click “Download” on the interface to download the compressed package to your local computer. Select Plugin-> Install Plugin from Disk in IDEA, select the downloaded compressed package and install it.

After the plugin is installed, restart IDEA and use it. The installation directory of the plugin is Tools-> MecAppDev


## Instructions for use

The plugin mainly contains 3 main functional modules, namely: MainMenu, AppPackage one-click packaging and APP sample

### MainMenu

The main interface contains three parts: AppAffinity, AppDepend, AppInformation:

-AppAffinity: Check the App affinity attribute, it will be written in the App deployment file to help the App deploy to the appropriate node

-AppDepend: You can view and directly rely on the existing api / SDK in the Toolbox, and generate the appSample folder, generate the java language-based sample code for the dependent api / SDK, and developers can directly compile and run the sample code to help developers Perform secondary development on existing functions to avoid duplicate work

-AppInformation: Contains the name, producer, and version number of the app, which will be written into the app deployment file

Click "OK" to generate appSample sample code folder and deployment folder named App name + "_app", if not, please refresh the project directory

The appSample folder contains sample calls for all APIs that the developer depends on

The deployment folder only contains the deployment framework. Developers need to write their own deployment files, specify image sources and dependencies, etc

### Download the APP sample

This function can download a sample application that has been developed, including the image and deployment files of the application, to help developers better understand the application deployment

### AppPackage One-click packaging

After the developer finishes writing the deployment file, he can use this function to select the deployment folder, which can be packaged into a csar format file for the next deployment operation

## Resource Terminology
|Chinese|English|Description|
|:-|:-|:-|
|亲和属性|Affinity|The ability of apps to rely more on running.|
|镜像|Image|Docker images generally include the operating system and application software.|
|部署|Deployment|App development needs to be deployed to the environment for consumer use.|
