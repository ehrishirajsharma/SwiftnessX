const initialStateData = {
  targets: [
    {
      id: 't1',
      title: 'Sample Target [Inbuilt]',
      folders: [
        {
          id: 'f1',
          title: 'Web Application',
          checklist: [
            {
              id: 'c1',
              title: 'Being a Better Hacker',
              content: 'content 1',
              done: false
            },
            {
              id: 'c2',
              title: 'Target Enumeration (Assets & endpoints discovery)',
              content: 'content 2',
              done: false
            },
            {
              id: 'c3',
              title: 'Common Misconfigurations',
              content: 'content 3',
              done: true
            }
          ],
          notes: [
            {
              id: 'n1',
              title: 'Server Side Request Forgery(SSRF)',
              content: 'content 1'
            },
            {
              id: 'n2',
              title: 'Cross-Site Request Forgery(CSRF)',
              content: 'content 2'
            },
            {
              id: 'n3',
              title: 'SQL Injection',
              content: 'content 3'
            }
          ]
        },
        {
          id: 'f2',
          title: 'Android [Coming Soon]',
          checklist: [
            {
              id: 'c1',
              title: 'Understanding Security Headers',
              content: 'content 1',
              done: false
            },
            {
              id: 'c2',
              title: 'Same Origin Policy (SOP) Bypass',
              content: 'content 2',
              done: true
            },
            {
              id: 'c3',
              title: 'XML External Entity Attack',
              content: 'content 3',
              done: false
            }
          ],
          notes: [
            {
              id: 'n1',
              title: 'Insecure Direct Object References (IDOR)',
              content: 'content 1'
            },
            {
              id: 'n2',
              title: 'Local File Inclusion (LFI)',
              content: 'content 2'
            },
            {
              id: 'n3',
              title: 'Remote File Inclusion (RFI)',
              content: 'content 3'
            }
          ]
        }
      ]
    }
  ],
  libraries: [
    {
      id: 'lib1',
      title: 'Sample-data-Inbuilt',
      folders: [
        {
          id: 'f1',
          title: 'Web Application',
          checklist: [
            {
              id: 'c1',
              title: 'Being a Better Hacker',
              content: 'content 1'
            },
            {
              id: 'c2',
              title: 'Target Enumeration (Assets & endpoints discovery)',
              content: 'content 2'
            },
            {
              id: 'c3',
              title: 'Common Misconfigurations',
              content: 'content 3'
            }
          ]
        },
        {
          id: 'f2',
          title: 'Android [Coming Soon]',
          checklist: [
            {
              id: 'c1',
              title: 'Cross-site Scripting (XSS)',
              content: 'content 1'
            },
            {
              id: 'c2',
              title: 'Server Side Request Forgery(SSRF)',
              content: 'content 2'
            },
            {
              id: 'c3',
              title: 'SQL Injection',
              content: 'content 3'
            }
          ]
        }
      ]
    }
  ],
  templates: [
    {
      id: 'abc1',
      title: 'Third template',
      content: 'content1'
    },
    {
      id: 'abc2',
      title: 'Fourth template',
      content: 'content2'
    }
  ],
  payloads: [
    {
      id: 'p1',
      title: 'Cross-site Scripting',
      data: [
        {
          id: 'd1',
          title: 'XSS Locator',
          content:
            '\';alert(Str\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//-->ing.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//-->'
        },
        {
          id: 'd2',
          title: 'SECOND Locator',
          content:
            '\';alert(Str\';alert(String.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//-->ing.fromCharCode(88,83,83))//\';alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//-->'
        }
      ]
    },
    {
      id: 'p2',
      title: 'SSRF',
      data: []
    }
  ]
};

export default initialStateData;
