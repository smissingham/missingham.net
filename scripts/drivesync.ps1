Remove-Item -Force -Recurse .\content\*
New-Item -ItemType Directory -Force -Path .\content
Copy-Item -Force -Recurse 'G:\My Drive\#notes\@Public\*' .\content\
#npx quartz sync