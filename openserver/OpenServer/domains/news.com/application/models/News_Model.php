<?php


class News_Model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
	}

	public function getNews($slug = FALSE, $limit, $offset, $sort_by, $sort_order)
	{

		$keyword = $this->input->get('keyword');

		if ($slug !== FALSE) {
			$query = $this->db->get_where('news', array('slug' => $slug));
			return $query->row_array();

		}

		$query = $this->db->select('date, title, description, text, photo, slug')->
		from('news')->
		like(array('title'=>$keyword))->
		limit($limit, $offset)->
		order_by($sort_by, $sort_order);

		$ret['rows'] = $query->get()->result();

		$query = $this->db->select('count(*) as count', FALSE)
			->from('news')->like(array('title'=>$keyword));

		$tmp = $query->get()->result();
		$ret['num_rows'] = $tmp[0]->count;


		return $ret;


	}

	public function getOtherNews($slug = FALSE){
		if ($slug !== FALSE) {
			$query = $this->db->select('date, title, description, text, photo, slug')->
			from('news')->
			where(' slug !=', $slug)->
			limit(2);

			$other_ret['rows'] = $query->get()->result();

			return $other_ret;
		}
	}


}
