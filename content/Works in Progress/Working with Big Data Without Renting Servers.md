---
tags:
  - big-data
  - jupyter
  - pandas
  - spark
  - wip
---



# Data Frame Libraries

## Pandas



## Polars

## Spark

### Dependencies

The biggest drawback to using Spark on Windows (or any home PC) is the dependencies. Spark is designed to run as a distributed system on large server infrastructure. To use it on your local machine, you have to install a Java runtime, and set up [Apache Hadoop ](https://www.knowledgehut.com/blog/big-data/how-to-install-apache-spark-on-windows#how-to-install-apache-spark-in-windows?%C2%A0step-by-step).

TLDR (For Windows):
- JVM
	- Use [[Productivity on Windows#Chocolatey]]] to `choco install openjdk`
- Hadoop
	- Download contents of following into a folder on your local machine, I use `C:\tools` 
		- https://codeload.github.com/robguilarr/spark-winutils-3.3.1/zip/refs/heads/master
	- Create ENV var HADOOP_HOME 
		- Point it to the hadoop folder you created, one directory up from /bin
	- Copy the hadoop.dll file from /bin into C:/Windows/System32

## Honourable Mentions

- Modin
- Dask
- [Apache Arrow](https://arrow.apache.org/docs/index.html)




