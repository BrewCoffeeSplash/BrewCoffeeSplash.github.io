<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<html>            
			<head>
				<link rel="stylesheet" href="./hw4.css"/>
			</head>
			<body>
				<h1>ABC Financial Startup</h1>
				<img class="center" src="./images/financialstartup.jpg" alt="Employees high-fiving and upwards moving bar graph"/>
				<div class="about_us">
					<p>We are a very young financial manager company and we are proud of our clients</p>
					<p>
						We have started with 1 client a little bit more than 10 years ago and now we have
						<xsl:value-of select="count(Accounts/Client)" />
						clients!
					</p>
					<p>
						These are our clients:
						<xsl:apply-templates select="Accounts/Client/Name">
						</xsl:apply-templates>
						<!-- <xsl:for-each select="Accounts/Client">
							<xsl:value-of select="Name" />
						</xsl:for-each> -->
						.
					</p>
					<p><xsl:value-of select="count(Accounts/Client/Years[. &gt; 7])"></xsl:value-of> of our clients have been with use for more than 7 years!</p>
				</div>
			</body>
			
		</html>
	</xsl:template>

	<xsl:template match="Name">
		<!-- add a "and" before last node -->
		<xsl:choose>
			<xsl:when test="position() = last()"> and </xsl:when>
		</xsl:choose>
		<!-- display first and last name for each client -->
		<xsl:value-of select="First" />
		<xsl:text> </xsl:text> <!--add an empty space between First and Last -->
		<xsl:value-of select="Last" />
		<!-- add a ","" for every name but the last node			 -->
		<xsl:choose>
			<xsl:when test="position() != last()">, </xsl:when>
		</xsl:choose>
	</xsl:template>



</xsl:stylesheet>