# CSE : Custom Search Engine

Un outil pour créer un moteur de recherche personnalisé à partir d'une liste de sites.

1. Créez un fichier sur un service en ligne de création de fichiers en Markdown (comme CodiMD, Digipad, Framapad …) ou sur la forge.
2. Ce fichier doit comporter : un titre, un bloc de citation qui constituera le message initial, et une liste de sites. Vous pouvez récupérer [ce modèle](https://codimd.apps.education.fr/b8KAltV2QQWR2rKhF_eYcg?both) ou bien regarder cet [exemple](https://cse.forge.apps.education.fr/#https://eyssette.forge.apps.education.fr/my-cse/intro-philo.md).
3. La recherche est plus pertinente si votre liste de sites n'est pas trop longue. Vous pouvez également utiliser le caractère générique `*`. Par exemple : `ac-*.fr` permet d'intégrer tous les sites `ac-lyon.fr`, `ac-grenoble.fr`, etc.
4. Votre moteur de recherche sera alors disponible à l'adresse : https://cse.forge.apps.education.fr/#URL (en remplaçant URL par l'URL de votre fichier).

## Forker le projet

Si vous forkez le projet, vous pouvez changer le moteur de recherche par défaut, préciser la langue de recherche, et utiliser des raccourcis pour pouvoir partager votre moteur de recherche avec une URL plus courte.

En local, quand vous avez récupéré le projet :

```
npm install
```

Vous pouvez notamment modifier le fichier `content.md`pour changer le contenu de la page initiale.

Une fois les changements faits dans les fichiers :

```
npm run build
```

Attention, si vous rajoutez des fichiers, il faudra aussi modifier le fichier `.gitlab-ci.yml` afin de les inclure dans votre page publique.

## Crédits

_Custom Search Engine_ est un outil libre et gratuit sous licence MIT.

Il utilise d'autres logiciels libres :

- [showdown](https://github.com/showdownjs/showdown) pour la conversion du markdown en html
- [SearXNG](https://github.com/searxng/searxng) si on le choisit comme moteur de recherche. Mais ce n'est plus le moteur de recherche par défaut, depuis un bug pas encore corrigé.
