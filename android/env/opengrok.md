为了浏览大规模代码 AOSP，androidref.com软件速度太慢，在本地Ubuntu20.4系统中上构建了opengrok环境，过程记录如下：

## 安装依赖
根据 https://oracle.github.io/opengrok/ 描述
需要安装JDK，11以上；servlet容器，我选择tomcat；以及解析工具**Universal** ctags, 注意不是exuberant-ctags，exuberant-ctags已经不维护了。
### 安装java 11

如果没有安装java，输入java系统提升如下：
```bash
july@july:~$ java

Command 'java' not found, but can be installed with:

sudo apt install default-jre              # version 2:1.11-72, or
sudo apt install openjdk-11-jre-headless  # version 11.0.9+11-0ubuntu1~20.04
sudo apt install openjdk-8-jre-headless   # version 8u272-b10-0ubuntu1~20.04
sudo apt install openjdk-13-jre-headless  # version 13.0.4+8-1~20.04
sudo apt install openjdk-14-jre-headless  # version 14.0.2+12-1~20.04

```

我安装最低要求11，安装完后检查下：
```bash
july@july:~$ java --version
openjdk 11.0.9 2020-10-20
OpenJDK Runtime Environment (build 11.0.9+11-Ubuntu-0ubuntu1.20.04)
OpenJDK 64-Bit Server VM (build 11.0.9+11-Ubuntu-0ubuntu1.20.04, mixed mode, sharing)


```
## 安装Tomcat
官方安装指导：https://tomcat.apache.org/tomcat-9.0-doc/building.html


下载

```bash
july@july:~/bin$ wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.39/bin/apache-tomcat-9.0.39.zip

```
官网如太慢可以使用镜像网站替换：

https://mirrors.cnnic.cn/apache/tomcat/tomcat-9/v9.0.39/bin/apache-tomcat-9.0.39.zip

```bash
unzip apache-tomcat-9.0.39.zip

#增加执行权限
chmod a+x -R ./apache-tomcat-9.0.39

```

但其实可以通过 ```sudo apt install tomcat9```安装，不必下载代码编译。安装过程中可以看到几个关键的目录
```bash
Creating user tomcat (Apache Tomcat) with uid 997 and gid 997.

Creating config file /etc/tomcat9/tomcat-users.xml with new version

Creating config file /etc/tomcat9/web.xml with new version

Creating config file /etc/tomcat9/server.xml with new version

Creating config file /etc/tomcat9/logging.properties with new version

Creating config file /etc/tomcat9/context.xml with new version

Creating config file /etc/tomcat9/catalina.properties with new version

Creating config file /etc/tomcat9/jaspic-providers.xml with new version

Creating config file /etc/logrotate.d/tomcat9 with new version

Creating config file /etc/default/tomcat9 with new version
Created symlink /etc/systemd/system/multi-user.target.wants/tomcat9.service → /lib/systemd/system/tomcat9.service.
/usr/sbin/policy-rc.d returned 101, not running 'start tomcat9.service'
Processing triggers for rsyslog (8.2001.0-1ubuntu1.1) ...
invoke-rc.d: policy-rc.d denied execution of try-restart.
Processing triggers for libc-bin (2.31-0ubuntu9.1) ...

```
可以到/usr/share/tomcat9/bin目录下执行启动脚本startup.sh。
```bash
july@july:/usr/share/tomcat9/bin$ sudo ./startup.sh
Using CATALINA_BASE:   /usr/share/tomcat9
Using CATALINA_HOME:   /usr/share/tomcat9
Using CATALINA_TMPDIR: /usr/share/tomcat9/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /usr/share/tomcat9/bin/bootstrap.jar:/usr/share/tomcat9/bin/tomcat-juli.jar
touch: cannot touch '/usr/share/tomcat9/logs/catalina.out': No such file or directory
./catalina.sh: 471: cannot create /usr/share/tomcat9/logs/catalina.out: Directory nonexistent

```

创建logs目录，并修改写权限

```bash
sudo mkdir logs
sudo chmod a+w logs
```

启动tomcat9



```
july@july:/usr/share/tomcat9/bin$ ./startup.sh
Using CATALINA_BASE:   /usr/share/tomcat9
Using CATALINA_HOME:   /usr/share/tomcat9
Using CATALINA_TMPDIR: /usr/share/tomcat9/temp
Using JRE_HOME:        /usr/lib/jvm/java-11-openjdk-amd64
Using CLASSPATH:       /usr/share/tomcat9/bin/bootstrap.jar:/usr/share/tomcat9/bin/tomcat-juli.jar
Tomcat started.
july@july:/usr/share/tomcat9/bin$
july@july:/usr/share/tomcat9/bin$

```

第一个依赖jdk>8已经安装完成。但是需要设置JAVA_HOME环境变量，编辑~/.bashrc增加环境变量，

如何找到jdk的安装目录呢？一般在/usr/lib/jvm/java-xx-openjdk-xxx目录下，也可以通过如下方法找到：

```bash
july@july:/etc/alternatives$ which java
/usr/bin/java
july@july:/etc/alternatives$ ls -l /usr/bin/java
lrwxrwxrwx 1 root root 22 Nov  8 09:59 /usr/bin/java -> /etc/alternatives/java
july@july:/etc/alternatives$ ls -l /etc/alternatives/java
lrwxrwxrwx 1 root root 43 Nov  8 09:59 /etc/alternatives/java -> /usr/lib/jvm/java-11-openjdk-amd64/bin/java
july@july:/etc/alternatives$

```

设置环境变量，在~/.bash增加如下代码并重新加载source ~/.bashrc。

```bash
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```




