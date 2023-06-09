# frozen_string_literal: true

class Todo < ApplicationRecord
  validates :name, presence: true
end
