---
tags:
  - wip
  - big-data
---
> [!warning] This page is a work in progress

# What & Why

It's very common in software and analytical modelling to need large swathes of synthetic data that *seems* legitimate.
Common uses include machine learning model testing, stress testing pre-production software environments, capability demos and more.

I've done a lot of this recently, and will soon be spending a weekend re-doing it in my own time.
I want to use Rust, and maybe some SIMD, and I want to open-source the outputs onto Huggingface so others who have my same requirements need not reinvent the wheel.

## Hallmark Requirements

### Data that is consistent across structures
For example. "Cost Price" in a geographically segmented source table should match the "Cost Price" (and thus Profit Margin) that appears in a transactions table for that geo segment.

### Examples that Resonate, and are Communicable
I want professionals from different companies to be able to share ideas. They should all be able to use this data set as a resonant example set so they can share ideas without requiring each other know the depths of proprietary knowledge within a business.

### Breadth & Depth
I want to be able to run massive compute-intensive algorithms against these data sets, so they need to be expansive in both breadth of columns & features, as well as depth (sheer size of volume)

### Analytics Ready
Analysts should be able to learn graphing and charting with these, and see sensible results when plotted.


# Getting Started

First, I will need a fake product catalog that can be modelled across the entire supply chain.

```mermaid  
graph LR
    Manufacture --> Distribution
    Distribution --> Retail
    Retail --> Customer
```

Currently, I'm thinking of using auto parts, because those products & brands are usually globally recognisable, and they're needed in expensive commercial contexts just as much as home-hobbyist so they're familiar to most people. 
They're also a great example case for promotional & kit/bundle modelling where a retailer might offer lubricant deals in conjunction purchase with discrete parts.

So, if you're reading this in its current state and wondering where the rest is, I'm busy scraping together a database of auto parts that doesn't infringe on private intellectual property domains 😅

>[!note] No Real Life Proprietary Data
> Though I will use globally known product brands as theoretical competitive offerings, I **WILL NOT** be using any real company as my pretend business in any of these examples.
>
>I've worked with many Fortune 500's on such software & modelling. I would never breach their trust, nor any NDA's. I value my job and my reputation.

## Example Companies

### Manufacturing:

I have two ideas for my theoretical manufacturer:
- Process Manufacturer: Oil & Lubricants
	- This way I can do some pretend modelling on index-based & process manufacturing use cases
- Discrete Manufacturer: Filters
	- Filters come in many shapes and sizes, for many different purposes. This should cover enough breadth to create a catalog of >100 unique skus

### Distribution:
- A distributor of parts, and lubricants

### Retail:
- A retailer of home hobbyist & semi-professional parts, who themselves have an Own-Brand offering (the manufacturer above), alongside carrying known brands

### Customers:
- Each of the above steps will need fake customer sets. I'll ruminate on how to achieve this.