/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "EditorPanel",
	kind: enyo.HFlexBox,
	components: [
		{name: "slidingPane", kind: "HSlidingPane", flex: 1, components: [
			{name: "top", height: "100%", kind:"HSlidingView",
				components: [
					{kind: "Header", content:"Editor", },
					{kind: "BasicRichText", hint: "type something here", richContent: false, className: "markdown-editor"}
			]},
			{name: "bottom", kind:"HSlidingView", height: "54px", flex:0,
				onResize: "generateMarkdown",
				components: [
					{kind: "Header", content:"Preview", className: "enyo-toolbar"},
					{kind: "BasicScroller", autoHorizontal: false, horizontal: false, components: [
						{kind: "HtmlContent", content: "This is some short text", className: "markdown-preview"}
					]}
			]}
		]}
	],
	generateMarkdown: function() {
		var converter = new Showdown.converter();
		this.$.htmlContent.setContent(converter.makeHtml(this.$.basicRichText.value));
	}
});
