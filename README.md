<h1 align="center">
  <br>
  <img src="https://s15.postimg.cc/omhc6tcrv/256px_2x.png" alt="Swiftness" width="100"></a>
  <br>
  SwiftnessX v0.2
  <br>
</h1>


<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/winter-is-coming.svg)](https://forthebadge.com)

</div>

<p align="center">A cross-platform note-taking & target-tracking app for penetration testers built on ElectronJS.</p>

![swiftnessX](https://github.com/ehrishirajsharma/swiftness-static/raw/master/Assets/main-view.png)

<h3 align="center">Download</h3>
<p align="center"><a href="https://github.com/ehrishirajsharma/SwiftnessX/releases/download/v0.2.2/Swiftness.0.2.2.AppImage" target="_blank">
 <img src="https://github.com/ehrishirajsharma/swiftness-static/blob/master/Assets/ubuntu-download.png" width="120px"/><a href="https://github.com/ehrishirajsharma/SwiftnessX/releases/download/v0.2.2/swiftness-setup-0.2.2.exe" target="_blank">
 <img src="https://github.com/ehrishirajsharma/swiftness-static/raw/master/Assets/windows-download.png" width="120px"/><a href="https://github.com/ehrishirajsharma/SwiftnessX/releases/download/v0.2.2/Swiftness-0.2.2.dmg" target="_blank">
 <img src="https://github.com/ehrishirajsharma/swiftness-static/raw/master/Assets/macos-download-button.png" width="120px"/></p>

## Contents

- <a href="https://github.com/ehrishirajsharma/swiftnessx/releases">Releases</a>
- <a href="#checklists">Checklists</a>
- <a href="https://www.youtube.com/watch?v=s227q_rTVkw">Usage</a>
- <a href="#Run-from-source">Run from source</a>
- <a href="#report">Report</a>
    - <a href="#bug-reporting">Report a bug</a>
    - <a href="#security-vulnerability">Report a security vulnerability</a>
- [Upcomings](#upcomings)
  - <a href="#upcomings">Current Goals</a>
  - <a href="#upcomings">How to contribute?</a>
- <a href="#credits">Credits</a>


## Checklists

We’re aiming to release a number of checklists with `v0.3` release. Please send the [request here](https://forms.gle/7W4SQJJjwuNLPESV6) to join in private-repo to collaborate with other researchers on its development. In meantime, you can download the below checklists to import in your libraries: 

- **OWASP-Testing-Checklist** from [@Ice3man543](https://github.com/Ice3man543): [Download](https://github.com/ehrishirajsharma/swiftness-static/raw/master/Checklist/OWASP-Testing-Checklist.json) (_Inspired by @tanprathan work_)

You can also download [the code](https://github.com/ehrishirajsharma/swiftness-static/blob/master/Checklist/generate-owasp-testing-checklist.go) to generate this checklist whenever any updates are available in the [original repository.](https://github.com/tanprathan/OWASP-Testing-Checklist)

------------------------

- **OSCP Methodology** from [@InitRoot](https://github.com/InitRoot): The checklist aim to assist OSCP students with a baseline methodology for the labs and exam environments. (Coming Soon)

------------------------

**To Import**: After downloading the `.json` file:

1. Open SwiftnessX app
2. Click on import/export button (right next to the Logo)
3. Select Import and select the downloaded `.json` file


## Run from source

#### Using Yarn (Recommended)
<details>
<summary>View Steps</summary>
<br>
To install yarn, please refer to <a href="https://yarnpkg.com/lang/en/docs/install/">this link.</a>
<br>
<br>

```php
> git clone https://github.com/ehrishirajsharma/swiftnessx.git //clone the repository
> sudo yarn //install dependencies within the repo folder
> sudo yarn dev //run the package
```

To update just use `git pull` or if dependencies are updated than first install them by `yarn`
</details>



#### Using Npm
<details>
<summary>View Steps</summary>
<br>
To install npm, please refer to <a href="https://nodejs.org/en">this link.</a>
<br>
<br>

```php
> sudo npm install electron -g --unsafe-perm=true --allow-root //install electron globally in system
> git clone https://github.com/ehrishirajsharma/swiftnessx.git //clone the repository
> sudo npm install --unsafe-perm=true --allow-root //install dependencies
> sudo npm run dev //run the package
```

To update just use `git pull` or if dependencies are updated than first install them by `npm install`
</details>


## Report

<strong id="bug-reporting"> :bug: Reporting a bug?</strong>

This is very early days of this project, therefore unexpected bugs, UI glitches and data-corruptions related issues may occur. I’d personally and strongly recommend to keep taking backups daily to not to loose any data if something bad happens.

Before reporting a bug or glitch, please confirm if it is not previously reported. Give most possible information about the issue: reproduction steps, OS/environments specifics and any possible suggestions to fix it.

You can use [this link](https://github.com/ehrishirajsharma/SwiftnessX/issues/new) to create and file an issue.

----------------------------------

<strong id="security-vulnerability"> :rotating_light: Reporting a security vulnerability?</strong>

Swiftness project was initially started to combat my day-to-day personal issues related to managing findings and checklist and was never built in mind for cross-platform support. However, to fulfill the gap for other OS, I decided to switch the project to ElectronJS. With the better flexibility, it came with a drawback of having too much dependencies on 3rd party libraries, ultimately, more concerns related to its security. 

<strong>What measures we’ve been taking:</strong>
<details>
  <summary>View</summary>
 
 <br>

- Kept the 3rd party dependencies lower, and built most of the modules from scratch.
- Tested injection related vulnerabilities.
- Regular check-up on 0-day vulnerabilities of the dependencies. 

</details>

<strong>Where to report?</strong>
<details>
  <summary>View</summary>
  <br>
You can send an email to security@swiftness.org, please provide as much as possible information on reproducing and fixing the vulnerabilities. We’re already aware of a few security vulnerabilities and working on to fix it.
</details>

<strong>References related to Electron security</strong>

Please refer to the below guide on understanding the basics and security of Electron: 

  - https://electronjs.org/docs/tutorial/security
  - https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  - https://www.youtube.com/watch?v=QSMbk2nLTBk

Also check the [package.json](https://github.com/ehrishirajsharma/SwiftnessX/raw/package.json) to see this project dependencies.


## Upcomings

We aim to release a major new update every 3 months, hoping to short this cycle however, testing and fixing the glitches for all the platforms take a bit time. Moreover, this project is maintained on weekends so you may see some slow replies on emails or issues.

- [ ] Dark Theme
- [ ] Support for Dropbox and Google Drive Sync
- [ ] Performance Refactors
- [ ] Reporting tools inspired by Frans Rosen (@fransr): https://github.com/fransr/template-generator 
- [ ] Better Text Editor: Enhanced Table features, export options, highlighting customisations, etc

<strong id="contribute">How to contribute?</strong>

You can contribute and keep this project alive by, finding bugs or security issues, suggesting new features, grammatical mistakes / document writing or by creating pull request for pending bugs or feature.

You can also contact me at [Twitter](https://twitter.com/ehrishiraj) (my DM is open), or write me an email to rishiraj@swiftness.org to discuss anything related to the current goals, project’s future or any possible collaborations.


## Credits

Special thanks to Tomas Baskys and Pankaj Prajapat for their huge contributions on this project. :clap:

- @InitRoot
- @ehsahil
- @SolomonSklash
