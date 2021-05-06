<section className="content">
            <div className="container">
              <div className="row">
                <div classname="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <input
                        type="text"
                        name="is_approve"
                        className="form-control"
                        value='1'
                        hidden
                      />
                      <div className="form-group">
                        <label htmlFor="exampleInputName">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Write a title "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <div className="form-line">
                            <label for="category">Select Categories</label>
                            <select name="categories[]" id="category" className="form-control selectpicker " data-live-search="true" data-max-options="3" multiple>
                               {/*  @foreach($categories as $category) */}
                                    <option value="">fgf</option>
                                {/* @endforeach */}
                            </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-line">
                            <label for="tag">Select Tags</label>
                            <select name="tags[]"  className="form-control selectpicker " data-live-search="true" data-max-options="3" multiple>
                                
                                    <option value="">fgfghfh</option>
                                
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>