class SearchPageController < ApplicationController
  def home

  	client_id = "ee7ef79a62fc7685ac2ef382c7a9ef885a3035d0"
  	divisions_url = "http://api.groupon.com/v2/divisions.json?client_id=#{client_id}"
  	divisions_hash = ActiveSupport::JSON.decode(open(divisions_url))

  	@divisions = [];
  	divisions_hash["divisions"].each do |division|
  		@divisions.append division
   	end

  end
end
