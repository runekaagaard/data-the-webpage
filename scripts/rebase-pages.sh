#!/usr/bin/env sh
git commit -a
git push origin master
git checkout gh-pages
git rebase origin/master
git push origin gh-pages --force
git checkout master
