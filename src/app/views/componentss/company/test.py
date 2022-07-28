#import html
import html
try:
	# Python 2.6-2.7
	from HTMLParser import HTMLParser
except ImportError:
	# Python 3
	from html.parser import HTMLParser
print("""<ol><li><span class="ql-size-huge">ABC</span></li></ol><p>bcd</p><blockquote>abc</blockquote>""")

