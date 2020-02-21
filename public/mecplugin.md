# 简介

此IDEA插件是在jdk1.8版本的基础上进行开发，它能够帮助APP开发者进行开发和部署，主要体现在以下两个方面：

- 通过插件可以对APPStore中提供的所有api生成样例代码，便于开发者进行二次开发

- 插件可以根据用户输入自动生成TOSCA语言的部署文件框架，并提供一键生成csar包功能，便于开发者进行部署 

# 开发环境准备

使用此插件前需要准备开发环境，主要包含以下几个方面：

- 下载[IntelliJ IDEA](https://www.jetbrains.com/idea/)，可以根据自身需求选择付费的旗舰版（Ultimate）或者免费的社区版（Community）

- 下载jdk，推荐使用jdk1.8及以上版本，设置jdk的环境变量并配置IDEA，新手可以查看[教程](https://blog.csdn.net/nobb111/article/details/77116259)


## 插件安装说明

插件支持两种安装方式：

- 在IDEA的Plugin市场搜索“MecAppDev”，直接下载安装（后续提供）

- 在界面点击“Download”，下载压缩包到本地，在IDEA中选择Plugin-> Install Plugin from Disk，选择下载的压缩包后进行安装

插件安装好后重启IDEA即可使用，插件的安装目录为Tools-> MecAppDev


## 使用说明

插件主要包含3个主要的功能模块，分别是：MainMenu、AppPackage一键打包和获取APP样例

### MainMenu

这是插件的主要部分，它的主界面如下所示：

![主界面](http://139.9.0.160/MEC-APP/developer-ide-plugin/raw/master/MarkDown/Pictures/MeanMenu.png)

主界面包含三个部分：AppAffinity、AppDepend、AppInformation：

- AppAffinity：勾选App亲和的属性，会写入App部署文件中，帮助App部署到合适的节点

- AppDepend：可查看并直接依赖Toolbox中已有的api/SDK，并生成appSample文件夹，对依赖的api/SDK生成基于java语言的示例代码，并且开发者可以直接编译运行示例代码，帮助开发者在已有功能上进行二次开发，避免重复工作

- AppInformation：包含App的名字、生产者、版本号，会写入App部署文件

点击“OK”后生成appSample样例代码文件夹和以App名字+“_app”为名的部署文件夹，如果没有请刷新工程目录

appSample文件夹中包含开发者依赖的所有api的调用样例

部署文件夹中仅包含部署框架，开发者需要自己编写部署文件，指定镜像源和依赖等

### 下载APP样例

此功能可以下载一个已经开发好的样例APP，包含App的镜像和部署文件，帮助开发者更好的理解App部署

### AppPackage一键打包

开发者在完成部署文件编写后，可以使用此功能选择部署文件夹，一键打包成csar格式的文件进行下一步的部署操作

## 资源术语
|中文|英文|说明|
|:-|:-|:-|
|亲和属性|Affinity|App在运行过程中更加依赖的能力。|
|镜像|Image|Docker镜像，一般包含了操作系统和应用软件。|
|部署|Deployment|App开发完成后需要部署到环境上，供消费者使用。|