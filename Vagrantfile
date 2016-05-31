api_version = '2'
provider    = 'virtualbox'
box         = 'centos/7'
hostname    = 'tw-box'
ip          = '192.168.50.13'
ram         = '2048'
cpus        = '2'


Vagrant.configure(api_version) do |config|
  
  #config.vm.box = "base"

  config.vm.define "tw" do |tw|
    end

    config.vm.box = box
    config.vm.host_name = hostname
    config.vm.network :private_network, ip: ip

    #config.vm.synced_folder ".", "/vagrant", type: "smb"
                                                  #original: virtualbox
    
    config.vm.provider :virtualbox do |virtualbox|
        virtualbox.name = hostname
        virtualbox.memory = ram
        virtualbox.cpus = cpus
        virtualbox.customize ['modifyvm', :id, '--name', hostname]
    end

    #config.vm.provision "shell" # ,run: "always"
     #do |setup|
       # setup.path = "z-vagrantsetup/utility.sh"
      #  setup.privileged = true
    #end
  
end
