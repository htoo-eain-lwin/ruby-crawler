class CreateToDo < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :name
      t.timestamps
    end
  end
end
