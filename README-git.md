# tw-project

## Metodologie de lucru

**Numele de commituri trebuie sa respecte niste norme !** (verificati commituri anterioare pe repo)

**Instalati urmatoarele:**
+ https://desktop.github.com/ - client de desktop pt Github (nu folositi decat pentru vizualizare de diffuri, **nu dati sync pentru ca veti crea probleme !**)
+ https://git-for-windows.github.io/ - bash de git care se poate suprapune peste cmd.exe, la instalare:
  +  Alegeti calea de mijloc - run git from the windows command prompt (nu da override la windows, si poti rula toate comenzile din git si din git bash - cygwin, i presume - si din cmd.exe)
  +  Nu instalati credential manager - e folosit pentru a va autoriza push-ul, de exemplu - este o fereastra separata de cmd.exe si va dura mult pana se deschide

#### Sincronizati cu repo-ul principal (de fiecare data cand vreti sa faceti un push)

<!-- + `git fetch` //preia schimbarile din upstream -->
+ `git rebase master` //adauga schimbarile de pe github si pozitioneaza modificarile actuale peste cele din upstream; un exemplu:
``` 
  Before rebase
  > ... o ---- o ---- A ---- B  origin/master (upstream)
  >                    \      
  >                     C ---- M  master (origin)
  After rebase
  > ... o ---- o ---- A ---- B  origin/master (upstream)
  >                           \      
  >                            C ---- M  master (origin)
```

+ `git status` //verifica daca sunteti repo-ul local este in urma/fata repo-ului de pe github (al vostru), verifica daca au fost schimbate fisiere
+ `git add .` //daca sunt fisiere modificate/untracked, schimbarile vor fi salvate recursiv pe repo (orice (sub)folder sau fisier modificat sau adaugat)
+ `git commit -m "mesaj"`//orice fisier adaugat prin add va fi inclus in acest commit; mesaj este un tag care poate fi inlocuit cu orice string; respectati politica de mesaje !
+ `git push origin master` //commitul va fi incarcat pe remote-ul de origin (repo-ul vostru) pe branchul master (grija la branchuri !)

#### Comenzi extra:
+ `git log` //verifica commiturile anterioare (commit history, basically) - navigati cu tastele directionale, apasati 'q' si apoi dati enter pentru iesire
+ `git reset HEAD~1` ...
