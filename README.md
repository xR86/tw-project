# tw-project

[![slack shield mock](https://img.shields.io/badge/slack-available-ff69b4.svg?style=flat)](https://tw-dali.slack.com)
[![GitHub license](http://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/xR86/tw-project/)
  
[![Build Status](https://travis-ci.org/xR86/tw-project.svg?branch=master)](https://travis-ci.org/xR86/tw-project)
  

###CoDr (Free Code Camp Data Visualizer)
-> project description here: [/~busaco/teach/courses/web/projects/](http://profs.info.uaic.ro/~busaco/teach/courses/web/projects/xml-transform.php?pag=projects)

> Pe baza datelor publice vizand Free Code Camp, sa se dezvolte o aplicatie Web si API-ul REST aferent pentru explorarea, filtrarea, vizualizarea si, eventual, actualizarea informatiilor referitoare la participantii la competitii de programare si solutiile oferite. API-ul REST va folosi formatele JSON si XML. Suplimentar, vor fi realizate minim 3 modalitati de vizualizare, cat mai edificatoare si atractiva, a datelor. Aceste vizualizari vor putea fi exportate in formatele PNG si SVG. Interfata Web va adopta principiile designului Web responsiv. Bonus: recurgerea la vizualizari 3D.
>> Resurse suplimentare:
  >> + http://academictorrents.com/details/030b10dad0846b5aecc3905692890fb02404adbf
  >> + https://developer.mozilla.org/docs/SVG
  >> + http://profs.info.uaic.ro/~busaco/teach/courses/cliw/web-film.html#week5
  
-> scholarly html report here: [https://xr86.github.io/tw-project/](https://xr86.github.io/tw-project/)
  
**This repo extends initial work from**:
+ https://github.com/xR86/experimentS
+ https://github.com/dev-alberto/TW_proiect


###Structura
<!--- + [link](##Calendar)
-->
+ [Calendar](#calendar-anchor)
+ [Metodologie de lucru](#metodologie-lucru-anchor)


<a name="calendar-anchor"></a>

##Calendar

:thought_balloon:  __Saptamana 9__ - [descriere laborator](http://profs.info.uaic.ro/~busaco/teach/courses/web/web-projects.html#calendar)
... `deadline: 12.04.2016, ora 16 (S9)`
+ [X] wireframes: [wireframe folder](https://goo.gl/JXXELa)
+ [X] frotend protototype
+ [X] presentation & architecture: [presentation](https://goo.gl/JXXELa) (slideshare is buggy now) & [scholarly documentation of architecture](https://xr86.github.io/tw-project/)
+ [X] initial server implementation


<a name="metodologie-lucru-anchor"></a>

##Metodologie de lucru

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

####Comenzi extra:
+ `git log` \\verifica commiturile anterioare (commit history, basically) - navigati cu tastele directionale, apasati 'q' si apoi dati enter pentru iesire
+ in curand ... `git reset HEAD~1` **(*adauga explicatii aici*)**


