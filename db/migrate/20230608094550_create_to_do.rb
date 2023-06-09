class CreateToDo < ActiveRecord::Migration[7.0]
  def change
    create_table :to_dos do |t|
      t.name
      t.timestamps
    end
  end
end
