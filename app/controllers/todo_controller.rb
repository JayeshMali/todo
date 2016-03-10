class TodoController < ApplicationController

  def index
    @tasks=Task.all
    @tasks.each do |task|
        puts task
    end
    respond_to do |format|
     format.html
     format.json  { render :json => @tasks.to_json(:include => [:tags])}
     format.xml { render xml: @tasks }
   end
  end

  def create
    puts "Hello"
    puts params[:name]
    puts params[:detail]
    puts "Tags"
    @task=Task.new(:name=>params[:name],:detail=>params[:detail])
    @tags=params[:tag_name]
    @tags.each do |tag|
    puts "Name "+tag
    @tag=Tag.find_or_create_by(:name=>tag)
    @task.tags<<@tag
    end
    if(@task.save && @tag.save)
      puts "Saved"
    else
      puts "Not Saved"
    end

  end

  def edit
    # puts params[:name]
    # puts  params[:status]
    # puts  params[:detail]
  puts params[:id]
      @task=Task.find_by_id(params[:id])
      @task.name=params[:name]
      @task.status=params[:status]
      @task.detail=params[:detail]
      if(@task.save)
        puts "Updated"
      else
        puts "Not Updated"
      end
  end

  def find
  @task=Task.find_by_id(params[:id])
  puts @task
  end

  def delete
    @task=Task.find_by_id(params[:id])
    if(@task.destroy)
      puts "Successfully Deleted"
    else
      puts "Not Deleted"
    end
  end

  def status_true
      @tasks=Task.visible
      respond_to do |format|
       format.json  { render :json => @tasks.to_json(:include => [:tags])}
       format.xml { render xml: @tasks }
     end
  end

  def status_false
      @tasks=Task.invisible
      respond_to do |format|
       format.json  { render :json => @tasks.to_json(:include => [:tags])}
       format.xml { render xml: @tasks }
     end
  end

  # def update
  #   puts "Update"
  #   puts params[:id]
  #   @task=Task.find_by_id(params[:id])
  #   puts @task
  #   @task.name=params[:name]
  #   @task.detail=params[:detail]
  #    @tags=params[:tag_name]
  #    puts @tags
  #   puts "Tags "+@tags
  #    @task.tags=[];
  #    puts "List of tags"
  #   #  @tags.each do |tag|
  #   #  puts tag
  #   # @tag=Tag.find_or_create_by(:name=>tag)
  #   # @task.tags<<@tag
  #    #end
  #   # if(@task.save)
  #   #   puts "Updated"
  #   # else
  #   #   puts "Not Updated"
  #   # end
  # end



  def update
    puts "Name"
    puts params[:name]
    puts "Id"
    puts params[:id]
    puts "detail"
    puts params[:detail]
    puts "Tags"
    @task=Task.find_by_id(params[:id])
    puts "Name of task in database"
    puts @task.name
    @task.tags=[];
    @task.save;
    @task=Task.find_by_id(params[:id])
    puts @task.tags
    @task.name=params[:name]
    @task.detail=params[:detail]
    puts "Tags"
       @tags=params[:tag_name]
   #    puts @tags
    # @tags=params[:tag_name]
     @tags.each do |tag|
     puts tag
     @tag=Tag.find_or_create_by(:name=>tag)
     @task.tags<<@tag
     end
     if(@task.save)
      puts "Saved"
    else
      puts "Not Saved"
    end
  end

  end
