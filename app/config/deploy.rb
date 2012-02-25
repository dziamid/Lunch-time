set :application, "LunchTime"
set :domain,      "dream"
set :deploy_to,   "/var/www/dev"
set :app_path,    "app"
set :web_path,    "web"

set :repository,  "https://github.com/dziamid/Lunch-time"
set :scm,         :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `subversion`, `mercurial`, `perforce`, `subversion` or `none`

set :model_manager, "doctrine"
# Or: `propel`

role :web,        domain                         # Your HTTP server, Apache/etc
role :app,        domain                         # This may be the same as your `Web` server
role :db,         domain, :primary => true       # This is where Rails migrations will run

set  :keep_releases,  3

# this is to fix the tty bug (no password prompt)
default_run_options[:pty] = true

#symfony2
set :shared_files,      ["app/config/parameters.ini"]
set :shared_children,     [app_path + "/logs", web_path + "/uploads", "vendor"]
set :update_vendors, true