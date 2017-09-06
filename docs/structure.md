---
name: npmts project structure
description: how npmts projects are structured
---
# npmts - Project Structure

**locally**

```text
projectroot
|- .nogit/           # contains files that should not be checked into git - NOgit
|- dist/             # contains compiled js files and their corresponding typings - git
|- node_modules/     # contains the installed node modules - NOgit
|- test/             # contains the test files - git
|- ts/               # contains the source TypeScript files - git 
|
|- .gitignore        # the normal gitignore file
|- .gitlab-ci.yml    # the gitlab ci yml file
|- npmextra.json     # npmextra.json
```

**in git**
