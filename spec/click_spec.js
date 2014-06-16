describe('#click', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('is called on star click', function() {
    // given
    this.el.raty({
      click: function() {
        $(this).data('called', true);
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('click');

    // then
    expect(this.el.data('called')).toBeTruthy();
  });

  it ('has "this" as context', function() {
    // given
    this.el.raty({
      click: function() {
        $(this).data('this', this);
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('click');

    // then
    expect(this.el.data('this')).toBe(this.el[0]);
  });

  it ('receives the score as argument', function() {
    // given
    this.el.raty({
      click: function(score) {
        $(this).data('result', score);
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('click');

    // then
    expect(this.el.data('result')).toEqual(5);
  });

  context('with return as undefined', function() {
    it ('executes click behavior', function() {
      // given
      this.el.raty({
        click: function() {}
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('click');

      // then
      expect(this.el.children('input')).toHaveValue('5');
    });
  });

  context('with return as true', function() {
    it ('executes click behavior', function() {
      // given
      this.el.raty({
        click: function() {
          return true;
        }
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('click');

      // then
      expect(this.el.children('input')).toHaveValue('5');
    });
  });

  context('with return as false', function() {
    it ('does not executes click behavior', function() {
      // given
      this.el.raty({
        click: function() {
          return false;
        }
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('click');

      // then
      expect(this.el.children('input')).toHaveValue('');
    });
  });

  context('with :cancel', function() {
    it ('executes the callback', function() {
      // given
      this.el.raty({
        cancel : true,
        click  : function() {
          $(this).data('called', true);
        }
      });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('click');

      // then
      expect(this.el.data('called')).toBeTruthy();
    });
  });
});
