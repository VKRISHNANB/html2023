HTML5 doctype
---
Doctype stands for <b>Document Type Declaration</b>.  
It is an "information" to the browser about what document type to expect.  

Syntax
---

The general syntax for a document type declaration is:

    <!DOCTYPE root-element PUBLIC "FPI" ["URI"] [ 
        <!-- internal subset declarations -->
    ]>

or

    <!DOCTYPE root-element SYSTEM "URI" [ 
        <!-- internal subset declarations -->
    ]>

```examples:```  

    1. https://www.w3.org/QA/2002/04/valid-dtd-list.html  
    2. https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-iedoco/b615c777-ef05-4ac6-a565-dd0976e78465

The declaration is not an HTML tag.  
All HTML documents must start with a ```<!DOCTYPE>``` declaration.  
To indicate that your HTML content uses HTML5.

    /<!DOCTYPE html>


Doing so will cause even browsers that don't presently support HTML5 to enter into standards mode, which means that they'll interpret the long-established parts of HTML in an HTML5-compliant way while ignoring the new features of HTML5 they don't support.

This is much simpler than the former doctypes, and shorter, making it easier to remember and reducing the amount of bytes that must be downloaded.  

    doctype in Older Versions of HTML

Versions prior to HTML5 were based on ```Standard Generalized Markup Language``` (SGML), so their !doctype declaration had to contain a reference to their corresponding ```document type declaration``` (DTD).  
This also meant saving the DTD declaration and having separate ones for strict and transitional modes.  

    Note: HTML5 is based on its own standard and not SGML - that's why the HTML5 doctype does not require a DTD.  

HTML 4.01:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

XHTML 1.1:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

----

The <!DOCTYPE> declaration is NOT case sensitive.

----

