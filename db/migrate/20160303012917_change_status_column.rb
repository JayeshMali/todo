class ChangeStatusColumn < ActiveRecord::Migration
  def change
    change_column_default :tasks, :status, false
  end
end
