    url: https://www.w3schools.com/tags/tag_meta.asp

meta 
---

The ```<meta>``` tag defines metadata about an HTML document. Metadata is data (information) about data.  
```<meta>``` tags always go inside the ```<head>``` element, and are typically used to specify 
1. character set, 
1. page description, 
1. keywords, 
1. author of the document, and 
1. viewport settings.

Metadata will not be displayed on the page, but is machine parsable.  
Metadata is used by browsers (how to display content or reload page), search engines (keywords), and other web services.  
There is a method to let web designers take control over the viewport (the user's visible area of a web page), through the ```<meta>``` tag  

|Attribute | Value | Description |  
|:----|:---:|---:|
|charset | character_set | Specifies the character encoding for the HTML document|  
content | text | Specifies the value associated with the http-equiv or name attribute |  
http-equiv | content-security-policy / content-type / default-style / refresh | Provides an HTTP header for the information/value of the content attribute|  
|name |	application-name / author / description / generator / keywords / viewport | Specifies a name for the metadata |

------

Declaring the character set with the ```<meta charset>```
---
The charset attribute specifies the character encoding for the HTML document.  
Place this right after your ```<head>```, as some browsers restart the parsing of an HTML document if the declared character set is different from what they had anticipated.  

Example
---

    <!DOCTYPE html>
    <html lang="en">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
            <div>Hello HTML</div>
        </body>
    </html>

Also, if you are not currently using UTF-8, it's recommended that you switch to it in your web pages, as it simplifies character handling in documents using different scripts.  
The HTML5 specification encourages web developers to use the UTF-8 character set.  

    Note:  
    HTML5 restricts character sets to those compatible with ASCII and using at least 8 bits.  
    This was done to tighten security and prevent some types of attacks.

-------

