require 'rails_helper'

RSpec.describe Todo do
  describe 'db columns' do
    ## Attributes
    it { is_expected.to have_db_column(:name).of_type(:string) }
  end

  describe 'validations' do
    subject { described_class.create(name: 'tod1') }

    it { is_expected.to validate_presence_of(:name) }
  end
end
