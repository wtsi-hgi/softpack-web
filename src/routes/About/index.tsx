const About = () => {
  return (
    <div id="about">
      <h1>About</h1>

      <p>
        SoftPack is a software packaging platform that creates stable software
        environments that can be discovered and shared with others.
      </p>
      <p>
        These multi-user, cross-platform environments can consist of any
        software you like and aid in reproducable research by ensuring you can
        always return to the exact set of software (the same versions, including
        the same versions of all dependencies) as you used previously.
      </p>

      <h2>Discovering Environments</h2>

      <p>
        Before creating a new software environment for yourself, you can find if
        someone has already made an environment that you can use.
      </p>
      <p>
        Click on the "Environments" link in the sidebar to the left. This will
        show you a list of existing environments. Ones with a green "ready" bar
        on their left can be used. Click on it for instructions on how to use
        it.
      </p>
      <p>
        You can also search for environments by entering one or more search
        terms in the "Search for Environments" box at the top of the
        Environments screen. You can enter names of software packages or the name
        of an environment. You can also filter by the name of the user or group
        environments were created for, and by tag to get environments in certain
        categories. Finally, you can filter by your own environemnts by entering
        your username in the top right "Username" field and selecting "mine",
        and for environements that are currently building by ticking "building".
      </p>

      <h2>Using Environments</h2>

      <p>
        The environments that SoftPack creates are actually singularity images,
        which provide the reproducability. To make these easy to use on the
        farm, SoftPack wraps these images with modules and wrapper scripts, so
        that after loading the module, you can use the software in the
        environment as if it was installed locally.
      </p>

      <p>
        First you need to enable the module system and tell it where to look for
        environments. To do this, you should have something like the following
        in your ~/.bashrc file:
      </p>
      <pre>{`source /etc/profile.d/modules.sh
export MODULEPATH=$MODULEPATH:/software/modules/`}</pre>
      <p>
        Now you can copy the <samp>module load</samp> command in the Usage
        instructions for your discovered environment, and paste it in to your
        terminal, where you've ssh'd to a farm node. The Description of your
        environment will tell you what new executables will now be in your
        $PATH.
      </p>
      <p>
        For example, if you're using an environment with R modules in it,
        running <samp>R</samp> from your terminal will now use the R in the
        singularity container where the desired R modules are available to it.
      </p>

      <h2>RStudio</h2>

      <p>
        When using a SoftPack environment with R modules in it, you may wish to
        use those R modules in RStudio. Rather than create an environment that
        has the R modules and RStudio in it, we recommend excluding RStudio from
        the environment, and instead use our separate RStudio module on top.
      </p>
      <p>
        First <samp>module load</samp> your SoftPack environment as normal, then{" "}
        <samp>module load HGI/common/rstudio</samp>. You can then run{" "}
        <samp>rstudio start</samp> to launch an instance of rstudio on the farm
        that will have access to the R modules in your SoftPack environment.{" "}
        <samp>rstudio stop</samp> when you're done. See{" "}
        <samp>rstudio --help</samp> for more information, and in particular{" "}
        <samp>rstudio start --help</samp> for how to use your own locally
        installed R modules with it as well.
      </p>

      <h2>Creation</h2>

      <p>
        You can create environments from scratch, or based on a pre-existing
        environment ("clone"). To clone an environment, discover it in the
        usual way, click on it and then click the "clone" button in the top
        right of the information panel that appears. This will fill out the
        "Environment Settings" form described below, and you can alter the
        fields as desired.
      </p>

      <p>
        You can also merge a pre-existing environment with what's already in
        your "Create Environment" form. To do this, click on a SoftPack
        environment and click the 'Merge' button in the top right of the
        information panel. This will add the packages and settings of the
        existing environment to the form.
      </p>

      <p>
        If recipes already exist for all your desired software, you'll be able
        to use the web frontend to create software environments for yourself. If
        recipes don't exist, you'll have to contact the admin and have them
        create the recipe first.
      </p>

      <p>
        Following is an example of creating an environment of your own for the
        "xxhash" software.
      </p>

      <ul>
        <li>Click the "Create Environment" link in the left-hand side-bar.</li>
        <li>
          If you haven't already, enter your username in the top right
          "Username" field.
        </li>
        <li>
          Enter a name for this environment, a description, optional tags and
          then click on the folder dropdown and select users/[your username] or
          a group to indicate the environment is useful to other members of that
          group.
        </li>
        <li>
          In the "Package Settings" section, start typing "xxhash" in to the
          "Packages" field. A selection of matching packages will pop up; select
          the "xxhash" result.
        </li>
        <li>
          Without changing anything else you'd install the latest version (that
          there is a spack recipe for). Instead, click the little arrow in the
          xxhash entry and select 0.7.4 to install an older version.
        </li>
        <li>
          Now click the "CREATE" button, which should result in a pop-up message
          saying your request has been scheduled. (If you see a "Environment
          build failed" message instead, contact the admin to investigate.)
        </li>
      </ul>

      <p>
        The creation of your environment will take an unknown amount of time,
        depending on how many other builds have been scheduled before yours. It
        could be minutes or an entire day; please be patient.
      </p>

      <p>
        You will have been taken to the "Environments" page and it will show your
        building environments. Once it finishes building it will disappear from
        that view, so uncheck "building" to find it.
      </p>

      <p>
        If it turns red to indicate a failure, contact your admin and they'll
        investigate. Otherwise, you can click it to get its module load command
        similar to the "Usage" section above.
      </p>

      <p>
        If you no longer want this tutorial environment, please contact the
        admin and we'll delete it for you (deletion isn't currently available
        from the frontend).
      </p>
    </div>
  );
};

export default About;
