Remove-Item -Force -Recurse .\content\*
Copy-Item -Force -Recurse 'G:\My Drive\#blog-content\*' .\content\
npx quartz sync