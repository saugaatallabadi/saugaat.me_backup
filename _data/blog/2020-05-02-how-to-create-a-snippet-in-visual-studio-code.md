---
template: BlogPost
path: /how-to-create-a-snippet-in-visual-studio-code
date: 2020-05-01T06:15:50.738Z
title: 'How to Create a Snippet in Visual Studio Code'
thumbnail: /assets/pexels-pixabay-270557.jpg
metaDescription: df sdf df
---

Here's how you make a custom, global snippet in VSCode.

-   Press `COMMAND` + `SHIFT` + `P` to open the command palette.
-   Find "Preferences: Configure User Snippets".
-   Click "New Global snippets file". This will open up a file with a `.code-snippets`extension in `~/Library/Application Support/Code/User/snippets/filename.code-snippets`.

I made one that will allow me to type `perr` + TAB to print forced PHP errors.

PHPErrors.code-snippets

```
{
	"Show PHP Errors": {
		"scope": "php",
		"prefix": "perr",
		"body": [
			"ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);"
		],
		"description": "Show PHP Errors"
	}
}
```

And that's all.