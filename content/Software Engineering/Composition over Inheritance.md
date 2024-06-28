
You'll hear many programmers debate this subject, I land squarely in favour of Composition over Inheritance. But, unless you've had a lot of experience programming enterprise systems, the explanations out there are hard to grasp.

# Here is how I explain it, with a Pizza analogy.

Imagine you're a worker at a Pizza shop, and an order comes in for a margherita pizza, but your shop doesn't have that on the menu (don't ask *why not*, just go with it...)

## No Composition, No Inheritance:

You start with flour, yeast and water to make your dough. Raw tomatoes to make your sauce. A cow out the back to make the cheese.... Ridiculous to start from scratch isn't it? You wouldn't.
## Inheritance:

For every pizza that's on your menu, there's a stack of them premade exactly to that specification,  ready to throw in the oven. 

This is lightning fast when your customer wants *precisely* what's on the menu,, but you don't have margherita.

To accommodate this customers request, the closest you can do is take one of the pre-made pepperoni pizzas and remove the salami. 

This "margherita" pizza now tastes like remnant spicy salami, and has no basil. Your customer won't be pleased.

## Composition:

For every **ingredient** that is on your menu, there is a bucket at the counter full of that ingredient. There's a shelf full of pre-made pizza bases, and mozzarella etc.

You have a list of commonly known recipes for each pizza style on the wall in front of you to speed up construction of recurrent pizza orders.

You quickly Google how to make a margherita, throw it together on the bench and serve it to your customer. 

What's better, you can print that recipe and stick it on the wall/menu for next time!

# When to use which

The trade off in our example is that it's slower to construct each pizza individually (composition) as opposed to having them ready made (inheritance).

But, how often do you get asked for variation from the menu? 

If you're like a pizza shop, where "no olives" and "extra cheese" is common, you want composition. An opt-in process, where you have lower level *ingredients* ready to go, not an entire premade pizza that you have to deconstruct and will forever taste like remnant ingredients.
