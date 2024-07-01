---
tags:
  - big-data
  - jupyter
  - pandas
  - spark
  - wip
---
> [!warning] This page is a work in progress

Working with in-memory DataFrames in Pandas is great, until a client sends you a few 50GB files and needs you to join/pivot them and do some summary analytics. 
If you try to load this into Pandas, you'll quickly learn what an Out of Memory Exception is.

Your first thought might be to go to AWS and rent an EC2 virtual machine with 200GB+ RAM and continue on using the tools you're used to. This works for some, but I encourage learning to adapt and using alternatives tools that support this use case on home hardware, no extra cost outlay! 

To be clear, this article discusses "larger-than-memory" data sets. Those where the file size is greater than RAM on your local machine, but still fits on disk! For larger-than-storage data sets, there will be a follow up article.


# Data Frame Libraries
___
## Pandas
https://pandas.pydata.org/
Know it, love it, Pandas is the baseline. The Ford Model T of Python DataFrames if you will.

The downfall with Pandas when it comes to truly massive data is its inability to scale. [Pandas own top recommendation is just "load less data" 😂](https://pandas.pydata.org/docs/user_guide/scale.html)

There are two alternatives below, each with their own strengths and weaknesses.
___
## Polars
https://pola.rs/

Polars is a direct competitor to Pandas in that its primary function is to be a DataFrame library for statistical computing. On the home page, Polars touts a "up to 50x" performance improvement over Pandas by virtue of it being written in [[Rust]]. 

That performance boost is nice, but it's not why we're here. Remembering that we're working on Larger-than-Memory data sets (data file sizes exceed available RAM), we're here for the [Polars LazyFrame API](https://docs.pola.rs/py-polars/html/reference/dataframe/api/polars.DataFrame.lazy.html). 
In short, calling `.lazy()` on the first load of your data allows Polars to put off any preprocessing until you actually execute some code. 
You `.lazy()` load your CSV file, write out all of your DataFrame manipulations, and call `.collect()` at the end which means Polars can optimize the execution of all previous work into that one call instead of pre-loading everything into Memory and working on it there.

### Dependencies

Installing Polars is easy, just `pip install polars` once and you're ready.
Anywhere you're using pandas already you can now `import polars` and get right to work. 

___
## Apache Spark
https://spark.apache.org/

Apache Spark is primarily aimed at being a distributed processing tool, providing utilities and frameworks to that extent. One of, if not the primary tool spark offers is an alternative Dataframe.
https://spark.apache.org/docs/1.5.1/api/java/org/apache/spark/sql/DataFrame.html

Unlike the other options, Sparks DataFrame is `lazy` by default, meaning that if you choose to work with Spark dataframes you will automatically be delaying the execution of processing until the end. 

Another benefit Spark has over the other two is a [fully featured SQL api](https://spark.apache.org/sql/), allowing you to execute SQL against your DataFrame with no added dependencies. For someone with a strong background in SQL (like me) this is a brilliant feature, as it enables SQL querying a LAZY dataframe, where Spark can optimize a query plan against your data set just like a real database would.
### Dependencies

The biggest drawback to using Spark on Windows (or any home PC) is the dependencies. Spark is designed to run as a distributed system on large server infrastructure. To use it on your local machine, you have to install a Java runtime, and set up [Apache Hadoop ](https://www.knowledgehut.com/blog/big-data/how-to-install-apache-spark-on-windows#how-to-install-apache-spark-in-windows?%C2%A0step-by-step).

TLDR (For Windows):
- JVM
	- Use [[Productivity on Windows#Chocolatey]] to `choco install openjdk`
- Hadoop
	- Download contents of following into a folder on your local machine, I use `C:\tools` 
		- https://codeload.github.com/robguilarr/spark-winutils-3.3.1/zip/refs/heads/master
	- Create ENV var HADOOP_HOME 
		- Point it to the hadoop folder you created, one directory up from /bin
	- Copy the hadoop.dll file from /bin into C:/Windows/System32


# Bonus: In Memory OLAP with DuckDB
https://duckdb.org/

Having worked extensively with SQL in my past, I've come to love using it. Being able to SQL-query a data file is amazing. No need to set up a dedicated SQL server, there are options out there for in-process SQL engines supporting massive file sizes. Above, I refer to Spark SQL support, but here's another option I've been experimenting with lately, 

https://duckdb.org/docs/sql/introduction

DuckDB appears to support Polars, Pandas and Spark dataframes natively, but doesn't support the LazyFrames so I'm not yet certain how it handles the Larger-than-Memory problem despite that being one of the taglines on the home page. I presume to support larger-than-mem data with duckdb, one must directly query the file and not use a dataframe intermediary.
## Honourable Mentions

- Modin
- Dask
- [Apache Arrow](https://arrow.apache.org/docs/index.html)




