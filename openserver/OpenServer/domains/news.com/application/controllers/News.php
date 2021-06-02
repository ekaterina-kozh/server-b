<?php

defined('BASEPATH') OR exit ('No direct script access allowed');

class News extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->model('news_model');
	}

	public function index($sort_by = 'title', $sort_order = 'asc', $offset = 0) {
		$limit = 5;

		$data['title'] = 'Все новости';
		$result = $this->news_model->getNews(FALSE, $limit, $offset, $sort_by, $sort_order);

		$data['news'] = $result['rows'];
		$data['num_result'] = $result['num_rows'];
		$data['a'] = FALSE;

		$this->load->library('pagination');
		$config = array();
		$config['base_url'] = 'http://news/news/index/'.$sort_by.'/'.$sort_order;
		$config['total_rows'] = $data['num_result'];
		$config['per_page'] = $limit;
		$config['uri_segment'] = 5;
		$config['reuse_query_string'] = TRUE;

		$config["full_tag_open"] = '<ul class="pagination">';
		$config["full_tag_close"] = '</ul>';

		$config["first_link"] = "&laquo;";
		$config["first_tag_open"] = "<li>";
		$config["first_tag_close"] = "</li>";

		$config["last_link"] = "&raquo;";
		$config["last_tag_open"] = "<li>";
		$config["last_tag_close"] = "</li>";

		$config['next_link'] = '&gt;';
		$config['next_tag_open'] = '<li>';
		$config['next_tag_close'] = '<li>';

		$config['prev_link'] = '&lt;';
		$config['prev_tag_open'] = '<li>';
		$config['prev_tag_close'] = '<li>';
		$config['cur_tag_open'] = '<li><div class="pageNumber active"><a href="#">';
		$config['cur_tag_close'] = '</a></div></li>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';

		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$this->load->view('templates/header', $data);
		$this->load->view('news/index', $data);
		$this->load->view('templates/footer');
	}

	public function view($slug = NULL){
		$data['news_item'] = $this->news_model->getNews($slug, FALSE, FALSE, FALSE, FALSE);
		$result = $this->news_model->getOtherNews($slug);
		$data['news'] = $result['rows'];

		if(empty($data['news_item'])){
			show_404();
		}

		$data['a'] = TRUE;
		$data['title'] = $data['news_item']['title'];
		$data['photo'] = $data['news_item']['photo'];
		$data['description'] = $data['news_item']['description'];
		$data['date'] = $data['news_item']['date'];
		$data['text'] = $data['news_item']['text'];

		$this->load->view('templates/header', $data);
		$this->load->view('news/view', $data);
		$this->load->view('templates/footer');
	}

}
