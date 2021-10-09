# loan-payments
- need the Heroku CLI installed: 
    - `npm i -g heroku`
- login to Heroku:
    - `heroku login`
- need to attach the remote if not already linked: 
    - `heroku git:remote -a <app-name>`
- update any submodules that may have changed: 
    - Switch to main in each submodule
    - pull submodules
    - `git pull origin main`
- commit/add the new submodules
- push the changes - github
  - `git status`
  - `git add <submodule name>`
  - `git commit -a -m "Latest Version"`
  - `git push origin main`
- verify on Git the submodules are the correct version
- when ready, push to Heroku:
    - `git push heroku main`

If you make a change to a submodule
- Do not change the code in this project
- Make changes in the source project & push main branch
- open this project and then update submodules
- pull submodules
- commit parent project and push to Githb
- Check submodule version to ensure it matches