/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
var example = ""+
	"Typewriter\n"+
	"==========\n"+
	"\n"+
	"Welcome to *Typewriter*, a Markdown editor for the HP TouchPad.\n"+
	"\n"+
	"Markdown\n"+
	"--------\n"+
	" \n"+
	"Markdown lets you create richtext documents by entering text in a simple format that's easy to read and write. No bells and whistles, just you and your text.\n"+
	"\n"+
	"To create a document simply\n"+
	"\n"+
	" 1. Type Markdown text [in the editor][editor]\n"+
	" 2. Preview the document after [dragging up the toolbar][preview]\n"+
	" \n"+
	"Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][markdown]:\n"+
	"\n"+
	"> The overriding design goal for Markdown's\n"+
	"> formatting syntax is to make it as readable \n"+
	"> as possible. The idea is that a\n"+
	"> Markdown-formatted document should be\n"+
	"> publishable as-is, as plain text, without\n"+
	"> looking like it's been marked up with tags\n"+
	"> or formatting instructions.\n"+
	"\n"+
	"This document is written in Markdown; you are currently seeing the plaintext version. To get a feel for Markdown's syntax, type some text into the window and *pull up the toolbar*.\n"+
	"\n"+
	"What's next?\n"+
	"----------\n"+
	"\n"+
	"Go right ahead, [clear the editor][clear] and start typing. And don't mind the style, just mind your words. It'll come out alright by itself.\n"+
	"\n"+
	"  [john gruber]: http://daringfireball.net/\n"+
	"  [markdown]: http://daringfireball.net/projects/markdown/\n"+
	"  [editor]: #editor\n"+
	"  [preview]: #preview\n"+
	"  [clear]: #clear";

enyo.kind({
	name: "EditorPanel",
	kind: enyo.HFlexBox,
	components: [
		{name: "slidingPane", kind: "HSlidingPane", flex: 1, multiViewMinHeight:1, components: [
			{name: "top",flex: 1, kind:"HSlidingView", 
				components: [
					{kind: "Header", components: [
						{kind:"Image", "src":"images/icon.png"},
						{content: "Typewriter", "style": "padding-left: 10px;"},
						{kind: "Spacer", flex: 11},
						{kind: "ToolButtonGroup", components: [
							{caption: "Save File", onclick: "saveFile"},
							{caption: "Open File...", onclick: "openFile"}
						]},
						{kind: "Spacer"}
					]},
					{kind: "VFlexBox", flex: 1, components: [
						{kind: "HFlexBox", flex: 1, components: [
							{className: "desk-left", flex: 1},
							{kind: "BasicScroller",
								name:"editorScroller",
								flex: 10,
								autoHorizontal: false,
								horizontal: false,
								className: "output-scroller",
								components: [
									{kind: "BasicRichText",
										name: "editor",
										flex: 10,
										value: example,
										richContent: false,
										className: "editor-input",
										onblur: "generateMarkdown",
										onfocus: "showKeyboard"
									}
								]
							},
							{className: "desk-right", flex: 1}
						]}
					]}
			]},
			{name: "bottom", kind:"HSlidingView", height: "62px", flex:0, //peekHeight: 54,
				onResize: "barMoved",
				components: [
					{kind: "Header", className: "enyo-toolbar fake-toolbar", components: [
						{kind: "GrabButton", className: "HGrabButton"},
						{kind: "Spacer", flex: 18},
						/*{kind: "ToolButtonGroup", className: "enyo-toolbutton-dark", components: [
							{caption: "Headline", name:"markupheadline", className: "markuphelper", onclick:"markupHeadline" },
							{caption: "List", name:"markuplist", className: "markuphelper", onclick:"markupList" },
							{caption: "Link", name:"markuplink", className: "markuphelper", onclick:"markupLink" },
							{caption: "Quote", name:"markupquote", className: "markuphelper", onclick:"markupQuote" },
							{caption: "Code", name:"markupcode", className: "markuphelper", onclick:"markupCode" },
							{caption: "Image", name:"markupimage", className: "markuphelper", onclick:"markupImage" },
						]},
						{kind: "Spacer", flex: 10},
						*/
						{kind: "ToolButtonGroup", className: "enyo-toolbutton-dark", components: [
							{caption: "Syntax", name:"helpmarkdown", onclick: "helpMarkdown"},
							{caption: "Typewriter", name:"helptypewriter", onclick: "helpTypewriter"},
							{caption: "Print", name:"print", onclick: "printDocument"}
						]},
						{kind: "Spacer"},
						{kind: "GrabButton", className: "HGrabButton Right"},
					]},
					{kind: "VFlexBox", flex: 1, components: [
						{kind: "HFlexBox", flex: 1, components: [
							{className: "desk-left", flex: 1},
							{kind: "BasicScroller",
								name:"previewScroller",
								flex: 10,
								autoHorizontal: false,
								horizontal: false,
								className: "output-scroller",
								components: [
									{kind: "HtmlContent",
										name: "preview",
										className: "output-preview",
										onLinkClick: "htmlContentLinkClick"
									}
								]
							},
							{className: "desk-right", flex: 1}
						]}
					]}
			]}
		]},
		{name:'filePicker', kind: "FilePicker", fileType:["image"], allowMultiSelect:false, onPickFile: "handleFile"},
		{kind: "PrintDialog", 
			duplexOption: true,
			frameToPrint: {name:"preview", landscape:false},
			appName: "Typewriter"
		},
		{name: 'markdownHelper', kind: "Popup", defaultKind: "Item", components: [
				{className: "enyo-first", components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"Headline 1\n" + 
							"==========\n" + 
							"\n" +
							"Headline 2\n" + 
							"----------\n" +
							"\n" +
							"### Headline 3"
						},
						{kind: "Label", content:"Headlines"}
					]}
				]},
				{components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"Paragraphs are separated by an empty line\n" + 
							"\n" + 
							"Linebreaks are preceded by two spaces at the end of the line"
						},
						{kind: "Label", content:"Paragraphs"}
					]}
				]},
				{components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							" 1. Numbered Listitem\n" + 
							" 2. Numbered Listitem \n" + 
							"   * Nested unordered List"
						},
						{kind: "Label", content:"Lists"}
					]}
				]},
				{components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"> A Quote\n" +
							"> > A nested Quote"
						},
						{kind: "Label", content:"Quotes"}
					]}
				]},
				{components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"----"
						},
						{kind: "Label", content:"Horizontal Rules"}
					]}
				]},
				{components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"[link name][alias]\n" + 
							"\n" + 
							"  [alias]: http://www.google.de/"
						},
						{kind: "Label", content:"Links"}
					]}
				]},
				{className: "enyo-last", components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"    /* indented by 4 or more spaces */\n"+
							"    function(x,y)..."
						},
						{kind: "Label", content:"Code"}
					]}
				]},

		]},
		{name: 'typewriterHelper', kind: "Popup", defaultKind:"Item", components: [
				{className: "enyo-first", components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
							"Title of Work\n" + 
							"=============\n" +
							"\n" +
							"This text is styled to resemble a cover page\n" +
							"\n" +
							"----\n" +
							"\n" +
							"The horizontal ruler (above) makes this become regular text"
						},
						{kind: "Label", content:"Cover Page"}
					]}
				]},
				{className: "enyo-last", components: [
					{kind: "HFlexBox", components: [
						{className: "markdownHelper", flex: 1, content: ""+
					"Title of Work\n" + 
					"=============\n" +
					"\n" +
					"This text is styled to resemble a cover page\n" +
					"\n" +
					"First Chapter\n" +
					"-------------\n" +
					"\n" +
					"This text is not on the cover page but the first chapter"
						},
						{kind: "Label", content:"Cover Page"}
					]}
				]},
		]}
	],
	
	/* PREVIEW HANDLING */
	
	barMoved: function(event) {
		if(event.slidePosition == 0) { // down position
			this.position = "down";
			this.$.editorScroller.setScrollTop(this.$.previewScroller.scrollTop/this.$.previewScroller.getBoundaries().bottom*this.$.editorScroller.getBoundaries().bottom);
			//this.$.editor.forceFocus(); // buggy with on screen keyboard
			this.$.print.addClass("enyo-button-disabled");
			this.$.print.disabled = true;
			
			//this.$$.select(".markuphelper").each(function(item) {
			//	item.removeClass("enyo-button-disabled");
			//	item.disabled = false;
			//});
			
			/*
			this.$.markupheadline.removeClass("enyo-button-disabled");
			this.$.markuplist.removeClass("enyo-button-disabled");
			this.$.markuplink.removeClass("enyo-button-disabled");
			this.$.markupquote.removeClass("enyo-button-disabled");
			this.$.markupcode.removeClass("enyo-button-disabled");
			this.$.markupimage.removeClass("enyo-button-disabled");
			this.$.markupheadline.disabled = false;
			this.$.markuplist.disabled = false;
			this.$.markuplink.disabled = false;
			this.$.markupquote.disabled = false;
			this.$.markupcode.disabled = false;
			this.$.markupimage.disabled = false;
			*/
		}
		else {  // up position
			this.position = "up";
			this.$.previewScroller.setScrollTop(this.$.editorScroller.scrollTop/this.$.editorScroller.getBoundaries().bottom*this.$.previewScroller.getBoundaries().bottom);
			this.$.print.removeClass("enyo-button-disabled");
			this.$.print.disabled = false;
			
			//this.$$.select(".markuphelper").each(function(item) {
			//	item.addClass("enyo-button-disabled");
			//	item.disabled = true;
			//});
			
			/*
			this.$.markupheadline.addClass("enyo-button-disabled");
			this.$.markuplist.addClass("enyo-button-disabled");
			this.$.markuplink.addClass("enyo-button-disabled");
			this.$.markupquote.addClass("enyo-button-disabled");
			this.$.markupcode.addClass("enyo-button-disabled");
			this.$.markupimage.addClass("enyo-button-disabled");
			this.$.markupheadline.disabled = true;
			this.$.markuplist.disabled = true;
			this.$.markuplink.disabled = true;
			this.$.markupquote.disabled = true;
			this.$.markupcode.disabled = true;
			this.$.markupimage.disabled = true;
			*/
		}

		//this.generateMarkdown();
	},
	generateMarkdown: function() {
		var converter = new Showdown.converter();
		
		var value = this.$.editor.getValue();
		this.$.preview.setContent(converter.makeHtml(value));
		//this.$.htmlContent.setContent(converter.makeHtml(example));
	},
	htmlContentLinkClick: function(sender, url) {
		var splits = url.split(/#/).slice(-1).pop();
		switch(splits) {
			case "clear":
				this.$.editor.setValue("");
			case "editor":
				this.$.slidingPane.selectView(this.$.top);
				return false;
				break;
			case "preview":
				this.$.slidingPane.selectView(this.$.bottom);
				return false;
				break;
			default:
				var r = new enyo.PalmService();
				r.service = "palm://com.palm.applicationManager/";
				r.method = "open";
				r.call({target: url});
		}
	},
	
	/* PRINT HANDLING */
	
	printDocument: function() {
		if(this.position == "down") {
			alert("Preview first!");
		}
		else {
			this.$.printDialog.openAtCenter();
		}
	},
	
	/* FILE HANDLING */
	
	openFile: function() {
		this.$.filePicker.pickFile();
	},
	handleFile: function(inSender, msg) {
		this.$.editor.setValue(enyo.json.stringify(msg));
	},
	
	/* MARKUP CALLBACKS */
	
	markupHeadline: function() {
	},
	markupList: function() {
	},
	markupLink: function() {
	},
	markupQuote: function() {
	},
	markupCode: function() {
	},
	markupImage: function() {
	},
	
	helpMarkdown: function() {
		this.$.markdownHelper.openAtControl(this.$.helpmarkdown, {left: 170});
	},
	helpTypewriter: function() {
		this.$.typewriterHelper.openAtControl(this.$.helptypewriter, {left: 220});
	},
	showKeyboard: function() {
		enyo.keyboard.show();
	},

	
	
	
	/* CONSTRUCTOR */
	
	ready: function() {
		enyo.keyboard.setManualMode(true);
		enyo.keyboard.show();
		this.generateMarkdown();
		this.$.editor.forceFocus();
	}
});
