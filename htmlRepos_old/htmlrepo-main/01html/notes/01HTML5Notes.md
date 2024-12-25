THE ANATOMY OF A WEB PAGE
---
A minimal web page  can be assembled from four separate file:  

    * an HTML document (index.html),  
    * a style sheet (index.css), 
    * a javascript files (index.js) and 
    * a graphics file (logo.png)  


The HTML Document
---
The HTML file is a simple text-only document that is referred to as ```the source document```. <div/>
```The source document``` also contains the text content of the page plus special tags (indicated with angle brackets, < and >) that describe each element on the page.<div/>
Adding descriptive tags(elements) to a text document is known as ```marking up``` the document.<div/> 
Web pages use a markup language called ```HyperText Markup Language```, or ```HTML``` for short, which was created especially for documents with hypertext links.  

The Anatomy of an HTML Element
---
Elements are identified by tags in the text source.   
A tag consists of the element name (usually an abbreviation of a longer descriptive name) within angle brackets (< >).   
The rendering agent in the browser knows that any text within brackets is hidden and not displayed in the browser window. <div/> 
The element name appears in the opening tag (also called a start tag) and again in the closing (or end) tag preceded by a slash (/).   
The closing tag works something like an “off” switch for the element. <div/>
The tag added around the content is referred to as the markup.  
 An element consists of both the content and its markup (the start and end tags). <div/>
Not all elements have content.   
Some are empty by definition, such as the ```img``` element used to add an image to the page. <div/>

```Capitalization:``` In HTML, the capitalization of element names is not important (it is not case-sensitive).  
So <img>, <Img>, and <IMG> are all the same as far as the browser is concerned.  However, most developers prefer the consistency of writing element names in all lowercase. <div/> 

====================================================

Basic Document Structure
---
The only element that is required in HTML is the title.  
The recommended minimal skeleton of an HTML document, to explicitly organize documents into metadata ( head ) and content ( body ) areas.  

  1 \<!DOCTYPE html>  
  2 \<html>  
|---->3\<head>  
|-------------->4 \<meta charset="utf-8" />  
|-------------->5 \<title>Title here\</title>  
|---->3\</head>  
|---->6\<body>  
|------------> Page content goes here.  
|---->6\</body>  
  2 \</html>

  1. ```<!DOCTYPE html>:``` The first line is a document type declaration (also called DOCTYPE declaration) that lets modern browsers know which HTML specification to use to interpret the document. This DOCTYPE identifies the document as written in HTML5.
  2. The entire document is contained within an ```html``` element. The html element is called the root element because it contains all the elements in the document, and it may not be contained within any other element.
  3. Within the html element, the document is divided into a ```head and a body```. The head element contains elements that pertain to the document that are not rendered as part of the content, such as its title, style sheets, scripts, and metadata.
  4. The ```meta``` elements provide document metadata, information about the document. In this case, it specifies the character encoding (a standardized collection of letters, numbers, and symbols) used in the document as Unicode version UTF-8. Other types of metadata provided by the meta element are the ```author, keywords, publishing status, and a description``` that can be used by search engines.
  5. Also in the head is the mandatory ```title``` element. According to the HTML specification, every document must contain a descriptive title. 
  6. Finally, the body element contains everything that we want to show up in the browser window.  
  
Introducing Unicode
--
All the characters that make up languages are stored in computers as numbers. A standardized collection of characters with their reference numbers (code points) is called a coded character set, and the way in which those characters are converted to bytes for use by computers is the character encoding.  
In the early days of computing, computers used limited character sets such as ASCII that contained 128 characters (letters from Latin languages, numbers, and common symbols). The early web used the Latin-1 (ISO 8859-1) character encoding that included 256 Latin characters from most Western languages.  
But given the web was “worldwide,” it was clearly not sufficient.Enter Unicode. Unicode (also called the Universal Character Set) is a super-character set that contains over 136,000 characters (letters, numbers, symbols, ideograms, logograms, etc.) from all active modern languages. You can read all about it at unicode.org .  
Unicode has three standard encodings—UTF-8, UTF-16, and UTF-32—that differ in the number of bytes used to represent the characters (1, 2, or 3, respectively).  
HTML5 uses the UTF-8 encoding by default, which allows wide ranging languages to be mixed within a single document. It is always a good idea to declare the character encoding for a document with the meta element.  

Mark It Up Semantically
---
The purpose of HTML is to add meaning and structure to the content. It is not intended to describe how the content should look (its presentation). Your job when marking up content is to choose the HTML element that provides the most meaningful description of the content at hand. In the biz, we call this semantic markup.  
For example, the most important heading at the beginning of the document should be marked up as an ```h1```.  
The important thing is that you choose elements based on what makes the most sense for the content.  

Document Structure - DOM
--- 
In addition to adding meaning to content, the markup gives the document structure. The way elements follow each other or nest within one another creates relationships between them. You can think of this structure as an outline (its technical name is the ```DOM```, for Document Object Model). The underlying document hierarchy gives browsers cues on how to handle the content.  
It is also the foundation upon which we add presentation instructions with style sheets and behaviors with JavaScript.  <div/>  

Use HTML for defining the document structure only
---
Although HTML was intended to be used strictly for meaning and structure since its creation, that mission was somewhat thwarted in the early years of the web. With no style sheet system in place, HTML was extended to give authors ways to change the appearance of fonts, colors, and alignment using markup alone. 
<div/>

Block and Inline Elements
---
<h2>Block Elements</h2>
The heading and paragraph elements start on new lines and do not run together. Headings and paragraphs display as block elements. Browsers treat block elements as though they are in little rectangular boxes, stacked up in the page. Each block element begins on a new line, and some space is also usually added above and below the entire element by default.
<div/>
<h2>Inline Elements</h2>
Inline element are also called a text-level semantic element or phrasing element. Inline elements do not start new lines; they just go with the flow.

Default Styles
---
All browsers have their own built-in style sheets (called ```user agent style sheets``` in the spec) that describe the default rendering of elements. The default rendering is similar from browser to browser (for example, h1 s are always big and bold), but there are some variations (the blockquote element for long quotes may or may not be indented).
<div/>
If you think the h1 is too big and clunky as the browser renders it, just change it with your own style sheet rule. 

```Resist the urge to mark up the heading with another element just to get it to look better``` — for example, using an h3 instead of an h1 so it isn’t as large. 
<div/>  

```You should always choose elements based on how accurately they describe the content```, and don’t worry about the browser’s default rendering.

