module Fastlane
    module Actions
        module SharedValues
            ANDROID_VERSION_NAME = :ANDROID_VERSION_NAME
        end

        class IncrementAndroidVersionNameAction < Action
            def self.run(params)
                path = params[:path]
                type = params[:type]

                major = 0
                minor = 0
                patch = 0

                data = File.read(path)
                data.each_line do |line|
                    if (line.start_with?("VERSION_MAJOR"))
                        major = line.delete("VERSION_MAJOR=").to_i
                    elsif (line.start_with?("VERSION_MINOR"))
                        minor = line.delete("VERSION_MINOR=").to_i
                    elsif (line.start_with?("VERSION_PATCH"))
                        patch = line.delete("VERSION_PATCH=").to_i
                    end
                end

                if (type.casecmp("major").zero?)
                    major = major + 1
                    minor = 0
                    patch = 0
                elsif (type.casecmp("minor").zero?)
                    minor = minor + 1
                    patch = 0
                elsif (type.casecmp("patch").zero?)
                    patch = patch + 1
                end

                updated_data = data
                data.each_line do |line|
                    if (line.start_with?("VERSION_MAJOR"))
                        updated_data = updated_data.gsub(line, "VERSION_MAJOR=#{major}\r\n")
                    elsif (line.start_with?("VERSION_MINOR"))
                        updated_data = updated_data.gsub(line, "VERSION_MINOR=#{minor}\r\n")
                    elsif (line.start_with?("VERSION_PATCH"))
                        updated_data = updated_data.gsub(line, "VERSION_PATCH=#{patch}\r\n")
                    end
                end

                File.open(path, "w") do |f|
                    f.write(updated_data)
                end

                versionName = "#{major}.#{minor}.#{patch}"
                UI.message "Android version name updated to #{versionName}"
                return Actions.lane_context[SharedValues::ANDROID_VERSION_NAME] = versionName
            end

            def self.description
                'This action updates the Android version name'
            end

            def self.is_supported?(platform)
                platform == :android
            end

            def self.author
                "david.jones@hedgehoglab.com"
            end

            def self.available_options
                [
                    FastlaneCore::ConfigItem.new(key: :path,
                                       description: "Path to your version.properties file",
                                       optional: false),
                    FastlaneCore::ConfigItem.new(key: :type,
                                      description: "Version name value to update [major, minor, patch, or none]",
                                      optional: false)
               ]
            end

            def self.output
                [
                    ['ANDROID_VERSION_NAME', 'The new version name']
                ]
            end

            def self.example_code
                [
                    'increment_android_version_name(
                        path: "/path/to/version.properties"
                        type: "patch"
                    )'
                ]
            end

            def self.category
                :project
            end
        end
    end
end