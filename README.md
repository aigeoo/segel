# Segel

## Installation

1. Download the GIT system from the [link](https://github.com/git-for-windows/git/releases/download/v2.39.1.windows.1/Git-2.39.1-64-bit.exe) and follow the wizard.
2. Open cmd
3. Type `cd Desktop`
4. Type `git clone https://github.com/AIGEOO/segel.git`
5. Open PowerShell
6. Type

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows'))
```

7. return back to the cmd
8. Type `composer install`
9. Type `npm install`
10. Copy the file .env.example and rename the copy to .env
11. return back to the cmd
12. Type `php artisan key:generate`
13. Create the file in `segel/database/database.sqlite`
14. return back to the cmd
15. Type `php artisan migrate --seed`
16. Type `npm run build`
17. Type `php artisan serve`

Now you can finally access the application on http://127.0.0.1:8000
