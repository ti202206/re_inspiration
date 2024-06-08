// バリデーション関数
export const validateIdeaForm = (formData) => {
  const errors = {};
  if (formData.title.length > 30) errors.title = 'タイトルは30文字以内である必要があります。';
  if (formData.overview.length > 90) errors.overview = '概要は90文字以内である必要があります。';
  if (formData.content.length > 255) errors.content = '詳細は255文字以内である必要があります。';
  if (formData.price < 1 || formData.price > 1000000) {
      errors.price = '価格は1から1000000の範囲である必要があります。';
  }
  if (!formData.category_id) errors.category_id = 'カテゴリを選択してください。';

  return errors;
};

export const validateReviewForm = (formData) => {
  const errors = {};

  if (formData.review.length > 255) {
      errors.review = 'レビューは255文字以内である必要があります。';
  }
  if (formData.rating < 1 || formData.rating > 5) {
      errors.rating = '評価は1から5の範囲である必要があります。';
  }

  return errors;
};