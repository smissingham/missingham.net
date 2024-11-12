It's common to run a docker container with `docker run containername -it`, the final `-it` parameter there resulting in your terminal attaching to the container and allowing you to run CLI commands inside that container.

If you're like me though, and run most of your containers via declarative compose files, how can you attach your CLI to those containers run by a compose file?

Well, you first need to update your compose configuration to include two extra flags:
```
stdin_open: true # docker run -i
tty: true # docker run -t
```

And of course, re-up the container with `docker-compose up -d`

Now, you can use `docker attach containername`, and your terminal will be successfully attached to that container that was created and run by docker-compose


` flag is set to `true`.
* The `tty` flag is set to `true`.
* Your container name matches the one specified in the compose file.

That's it! With these simple steps, you can now attach your terminal to containers run by
