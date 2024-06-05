
REPL stands for "Read Evaluate Print Loop", but that doesn't tell you a lot.

In essence, a REPL is a software environment (usually a command-line interface) that allows a developer to write code and execute it, and have those values persist between interactions.

The best example of a REPL is the Chrome "Console" tab, which allows you to write Javascript and execute it. Then, write more javascript and execute it without losing state from the previous piece of code you wrote.

![[chrome-is-a-repl.gif]]

Note, the value of the `this_is_a_repl` variable persisted between executions. The value of these variables is only lost when the REPL is reset, which in this case is a browser refresh.

Another popular example is [Jupyter (Notebooks)](https://jupyter.org/), which is another browser based REPL but unlike the Chrome console, it allows you to write and execute in different programming languages.

Jupyter supports these other languages as *[Jupyter Kernels](https://docs.jupyter.org/en/latest/projects/kernels.html)*, essential each *kernel* is a code language REPL and Jupyter itself is just the browser utility on top which allows the developer to utilise them. The most popular REPL kernel for Jupyter is [IPython](https://ipython.org/) which supports python.

Like the above Chrome console example, variables inside a REPL will maintain state until that environment is reset. This is particularly handy for Data Science, where much CPU or GPU compute time might be spent training a `model` object, and you might wish to iterate on the code that utilises this model after the training. 

In a traditional software development environment, you would have to start up the program, let it build and execute and arrive at your code point-of-interest, but in a REPL you can maintain the state of the environment and only execute the snippets of code you're iterating on.