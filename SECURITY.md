## Report a security vulnerability</strong>

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
You can send an email to <code>security@swiftness.org</code>, please provide as much as possible information on reproducing and fixing the vulnerabilities. We’re already aware of a few security vulnerabilities and working on to fix it.
</details>

<strong>References related to Electron security</strong>

Please refer to the below guide on understanding the basics and security of Electron: 

  - https://electronjs.org/docs/tutorial/security
  - https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  - https://www.youtube.com/watch?v=QSMbk2nLTBk

Also check the [package.json](https://github.com/ehrishirajsharma/SwiftnessX/raw/package.json) to see this project dependencies.
