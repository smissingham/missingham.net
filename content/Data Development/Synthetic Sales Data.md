---
tags:
  - wip
  - big-data
---
> [!warning] This page is a work in progress

It's very common in software to need large swathes of synthetic data that *seems* legitimate.
Common uses include stress testing pre-production environments, capability demos and more.

I've done a lot of this recently, and will soon be spending a weekend re-doing it in my own time.
I want to use Rust, and maybe some SIMD, and I want to open-source the outputs onto Huggingface so others who have my same requirements need not reinvent the wheel.

First, I will need a fake product catalog that can be modelled across the entire supply chain.

```mermaid  
graph LR
    Manufacture --> Distribution
    Distribution --> Retail
    Retail --> Customer
```

Currently, I'm thinking of using auto parts, because those products & brands are usually globally recognisable, and they're needed in expensive commercial contexts just as much as home-hobbyist so they're familiar to most people. 
They're also a great example case for promotional & kit/bundle modelling where a retailer might offer lubricant deals in conjunction purchase with discrete parts.

So, if you're reading this in its current state and wandering where the rest is, I'm busy scraping together a database of auto parts that doesn't infringe on private intellectual property domain 😅

>[!note] I will use globally known product brands as theoretical competitive offerings, but I **WILL NOT** be using any real company as my pretend business in any of these examples

Manufacturing:

I have two ideas for my theoretical manufacturer:
- Process Manufacturer: Oil & Lubricants
	- This way I can do some pretend modelling on index-based & process manufacturing use cases
- Discrete Manufacturer: Filters
	- Filters come in many shapes and sizes, for many different purposes. This should cover enough breadth to create a catalog of >100 unique skus

Distribution:
- A distributor of parts, and lubricants

Retail:
- A retailer of home hobbyist & semi-professional parts, who themselves have an Own-Brand offering (the manufacturer above), alongside carrying known brands

Customers: