class CreateTagsTasks < ActiveRecord::Migration
  def up
      create_table :tags_tasks, :id=>false do|t|
        t.integer "task_id"
        t.integer "tag_id"
      end
      add_index :tags_tasks, ["task_id","tag_id"]
    end

    def down
      drop_table :tags_tasks
    end
end
