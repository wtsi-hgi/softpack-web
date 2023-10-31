const About = () => {
	return <>
		<h1>About</h1>

		<p>
			SoftPack is a software packaging platform that creates stable
			software environments that can be discovered and shared with others.
		</p>
		<p>
			These multi-user, cross-platform environments can consist of any
			software you like and aid in reproducable research by ensuring
			you can always return to the exact set of software (the same
			versions, including the same versions of all dependencies) as you
			used previously.
		</p>
		<p>
			For more information about softpack, you can explore its
			<a href="http://services.hgi.sanger.ac.uk/softpack-docs/">
				full documentation
			</a>.
		</p>

		<h2>Discovering Environments</h2>

		<p>
			Before creating a new software environment for yourself, you can
			find if someone has already made an environment that you can use.
		</p>
		<p>
			Click on the "Environments" link in the sidebar to the left. This
			will show you a list of existing environments. Ones with a green
			"ready" bar on their left can be used. Click on it for instructions
			on how to use it.
		</p>
		<p>
			You can also search for environments by entering one or more search
			terms in the "Search for Environments" box at the top of the
			Environments screen. You can enter names of software packages, the
			name of an environment, and the name of the user or group the
			environment was created for.
		</p>

		<h2>Using Environments</h2>

		<p>
			The environments that SoftPack creates are actually singularity
			images, which provide the reproducability. To make these easy to
			use on the farm, SoftPack wraps these images with modules and
			wrapper scripts, so that after loading the module, you can use the
			software in the environment as if it was installed locally.
		</p>

		<p>
			First you need to enable the module system and tell it where to look
			for environments. To do this, you should have something like the
			following in your ~/.bashrc file:
		</p>
		<pre>
			source /etc/profile.d/modules.sh
			export MODULEPATH=$MODULEPATH:/software/modules/
		</pre>
		<p>
			Now you can copy the `module load` command in the Usage instructions
			for your discovered environment, and paste it in to your terminal,
			where you've ssh'd to a farm node. The Description of your
			environment will tell you what new executables will now be in your
			$PATH.
		</p>
		<p>
			For example, if you're using an environment with R modules in it,
			running `R` from your terminal will now use the R in the singularity
			container where the desired R modules are available to it.
		</p>

		<h2>RStudio</h2>

		<p>
			When using a SoftPack environment with R modules in it, you may
			wish to use those R modules in RStudio. Rather than create an
			environment that has the R modules and RStudio in it, we recommend
			excluding RStudio from the environment, and instead use our separate
			RStudio module on top.
		</p>
		<p>
			First `module load` your SoftPack environment as normal, then
			`module load HGI/common/rstudio`. You can then run `rstudio start`
			to launch an instance of rstudio on the farm that will have access
			to the R modules in your SoftPack environment. `rstudio stop` when
			you're done. See `rstudio --help` for more information, and in
			particular `rstudio start --help` for how to use your own locally
			installed R modules with it as well.
		</p>
	</>
};

export default About;
